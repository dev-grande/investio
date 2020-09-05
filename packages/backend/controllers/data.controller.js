const pool_module = require('../helpers/pool');
const pool = pool_module.pool;
const jwt = require('../helpers/jwt');
const stock_service = require("../helpers/stock.service");

const successMessage = { status: 'success', ok: true };
const errorMessage = { status: 400 };

const uploadData = (request, response) => {
    if (jwt.isLoggedIn(request)) {
      var user = jwt.isLoggedIn(request); 
        var data = {}
        
        if (request.body.upload_data.full_data) {
            data = request.body.upload_data.full_data;
            for (var index in data) {
                var keys = Object.keys(data[index])
                var query_string = 'INSERT INTO raw_data ( ' + keys.join(", ");
                if (keys.length === 5) {   
                  query_string += ' ) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING'
                }
                else if (keys.length === 6) query_string += ' ) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING'
                else if (keys.length === 7) query_string += ' ) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING'
                else if (keys.length === 8) query_string += ' ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING'
                else if (keys.length === 9) query_string += ' ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING'
                else if (keys.length === 10) query_string += ' ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING'
                else query_string = "";

                
                if (query_string !== "") {
                  pool.query(query_string, Object.values(data[index]),
                  (error, results) => {
                      if (error) {
                          console.log(query_string);
                          console.log(data[index]);
                          throw error
                          }
                  });
                }
            }

            pool.query("select date, symbol from raw_data where type = 'transfer' and quantity != 0 and user_id = $1", 
            [user.user_id], (error, results) => {
                if (error) {
                    throw error  }
                var d = results.rows;
                for (var index in d ) {
                  pool.query("update raw_data set quantity = 0 where symbol = $1 and date < $2 and quantity != 0 and user_id = $3", 
                  [d[index].symbol, d[index].date, user.user_id], (error, results) => {
                    if (error) {
                        throw error
                        }});
                }

            });

            response.status(200).json(successMessage)

        }
        else {
            response.status(400).json({ status: 400, message: "error: insert error" });
        }
      }
      else {
        response.status(400).json({ status: 401, message: "error: unauthorized user" })
      }
  }


async function getDashboardData(request) {
  const id = parseInt(request.params.id)
  if (jwt.isLoggedIn(request)) {
    try {

      var result = {}

      var aggregated = await pool.query("SELECT to_char(month, 'YYYY-MM-DD') as Date, amount from \
      (SELECT date_trunc('month', date) AS month, sum(amount) as amount \
      FROM Raw_Data WHERE user_id = $1 AND type LIKE 'dividend' \
      GROUP BY month order by month) as table2", [id]);

      var div_total_resp = await pool.query("select sum(amount) as amount from raw_data where user_id = $1 and type LIKE 'dividend'", [id]);
      var div_total = Number(Number(div_total_resp.rows[0].amount).toFixed(2));

      var cash_value_resp = await pool.query("select sum(amount) from raw_data where user_id = $1", [id]);
      var cash_value = Number(Number(cash_value_resp.rows[0].sum).toFixed(2));

      var current_stocks = await pool.query("select symbol, quantity from (select symbol, sum(quantity) as quantity from raw_data where user_id = $1 group by symbol ) as table2 where quantity > 0 and symbol != '' order by quantity", [id])
      var new_current_stocks = await stock_service.getAllStockData(current_stocks.rows)
      var sorted_stocks = new_current_stocks.sort((a, b) => (a.amount < b.amount) ? 1 : -1);

      var invested_sum = new_current_stocks.reduce((a, b) => ({amount: a.amount + b.amount}))
      var invested =  Number(Number(invested_sum.amount).toFixed(2));

      var change_total = 0;  var close_total = 0;
      new_current_stocks.map((stock) => {
        change_total += (stock.change *  stock.quantity);
        close_total += (stock.close * stock.quantity);
      } );
      
      var change =  Number(Number(change_total).toFixed(2));
      var stock_percent = Number(Number((change_total/close_total)*100).toFixed(2));
      var account_percent = Number(Number((change_total/(cash_value + invested))*100).toFixed(2));

      var account_value = Number((cash_value + invested).toFixed(2));

      var div_stocks = await pool.query("select table3.symbol from ( select symbol from (select symbol, sum(quantity) \
      as val from raw_data  where user_id = $1 group by symbol ) as table2 where val > 0 and symbol != '') as table3 \
      INNER JOIN (select distinct symbol from raw_data where user_id = $2 and type = 'dividend') as table4 \
      ON table3.symbol = table4.symbol", [id, id]);

      if (div_stocks.rows[0]) {
        result.div_stocks = div_stocks.rows;
        result.selected_stock = div_stocks.rows[0].symbol;

        var individual_div = await pool.query("SELECT to_char(date, 'YYYY-MM-DD') as date, amount from raw_data where user_id = $1 and symbol = $2 and type = 'dividend' order by date;", 
        [id, result.selected_stock]);
        result.individual_div = individual_div.rows;
      }

      result.aggregated = aggregated.rows;
      result.div_total = div_total;
      result.cash_value = cash_value;
      result.invested = invested;
      result.account_value = account_value;
      result.current_stocks = sorted_stocks;
      result.change = change;
      result.account_percent = account_percent;
      result.stock_percent = stock_percent;
      
      return result;
    } catch (error) {
      return error;
    }
  }
  else {
    return { status: 401, message: "error: unauthorized user" };
  }
}


async function getReportsData(request) {
  const id = parseInt(request.params.id)
  if (jwt.isLoggedIn(request)) {
    try {
      var raw_div = await pool.query("select to_char(date, 'MM/DD/YYYY') as date, symbol, type, amount from raw_data where user_id = $1 AND type LIKE 'dividend' order by symbol, date desc", [id]);

      var aggregated_div = await pool.query("SELECT to_char(month, 'Mon YYYY') as Date, amount from \
      (SELECT date_trunc('month', date) AS month, sum(amount) as amount \
      FROM Raw_Data WHERE user_id = $1 AND type LIKE 'dividend' \
      GROUP BY month) as table2 order by month desc", [id]);

      var buy_sell = await pool.query("select to_char(date, 'MM/DD/YYYY') as date, symbol, type, quantity, price, amount from raw_data where (type = 'buy' or type = 'sell') and user_id = $1 order by symbol, date desc", [id]);
      "select sum(amount) as amount from raw_data where user_id = $1 and type LIKE 'dividend'"

      return {  raw_div: raw_div.rows, 
                aggregated_div: aggregated_div.rows, 
                buy_sell: buy_sell.rows 
              };
    } catch (error) {
      return error;
    }
  }
  else {
    return { status: 401, message: "error: unauthorized user" };
  }
}


async function getStockDivs(request) {
  const { user_id, symbol } = request.body
  if (jwt.isLoggedIn(request)) {
    try {
      var individual_div = await pool.query("SELECT to_char(date, 'YYYY-MM-DD') as date, amount from raw_data where user_id = $1 and symbol = $2 and type = 'dividend' order by date;", 
      [user_id, symbol]);

      return { individual_div : individual_div.rows };
    } catch (error) {
      return error;
    }
  }
  else {
    return { status: 401, message: "error: unauthorized user" };
  }
}

const getYears = (request, response) => {
  const id = parseInt(request.params.id)
  if (jwt.isLoggedIn(request)) {
    pool.query("select distinct to_char(date, 'YYYY') as year from raw_data where user_id = $1 order by year desc", 
    [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else {
    response.status(400).json({ status: 401, message: "error: unauthorized user" })
  }
}

const deleteYear = (request, response) => {
  const { user_id, year } = request.body

  var year_before = (Number(year) - 1).toString() + '-12-31';
  var year_after = (Number(year) + 1).toString() + '-01-01';

  if (jwt.isLoggedIn(request)) {
    pool.query('DELETE FROM raw_data WHERE user_id = $1 and date > $2 and date < $3', 
    [user_id, year_before, year_after], (error, results) => {
      if (error) {
        throw error
      }
      successMessage.data = `Transaction data within the year: ${user_id} was deleted`;
      response.status(200).send(successMessage)
    })
  }
  else {
    response.status(400).json({ status: 401, message: "error: unauthorized user" })
  }
}



module.exports = {
    uploadData,
    getDashboardData,
    getReportsData,
    getStockDivs,
    deleteYear,
    getYears
}


