const csv = require('csv-parser');
const fs = require('fs');
const pool_module = require('../helpers/pool');
const pool = pool_module.pool;
const pgp = require('pg-promise')({});
const db = pgp({    
    user: 'test_user',
    host: 'localhost',
    database: 'investio',
    password: 'test_password',
    port: 5432
});

async function seed_data(data) {

  var user_id = 1;

  const cs = new pgp.helpers.ColumnSet(Object.keys(data[0]), {table: 'raw_data'});
  const query = pgp.helpers.insert(data, cs);
  try {

    await db.none(query);

    await pool.query("select date, symbol from raw_data where type = 'transfer' and quantity != 0 and user_id = $1", 
    [user_id], (error, results) => {
        if (error) {
            throw error  }
        var d = results.rows;
        for (var index in d ) {
          pool.query("update raw_data set quantity = 0 where symbol = $1 and date < $2 and quantity != 0 and user_id = $3", 
          [d[index].symbol, d[index].date, user_id], (error, results) => {
            if (error) {
                throw error
                }});
        }
    });

    console.log("Data seeded");
  }
  catch {
    console.log("Data already seeded");
  }
}


var seed_files = ['/data/35833825_2017.csv', '/data/35833825_2018.csv', '/data/35833825_2019.csv', '/data/35833825_2020.csv']

for (var index in seed_files) {
var rows = [];
var seed_file = seed_files[index];
    fs.createReadStream(process.cwd() + seed_file )
      .pipe(csv())
      .on('data', (row) => {
        if (row["DATE"] !== '***END OF FILE***')
        {
          var data = {user_id: 1}
          if (row["DESCRIPTION"].includes("DIVIDEND") || row["DESCRIPTION"].includes("Dividend")) {
              data['type'] = "dividend";
          }
          else if (row["DESCRIPTION"].includes("Bought")) {
              data['type'] = "buy";
          }
          else if (row["DESCRIPTION"].includes("Sold")) {
              data['type'] = "sell";
          }
          else if (row["DESCRIPTION"].includes("CHECK RECEIPT")) {
              data['type'] = "deposit";
          }
          else if (row["DESCRIPTION"].includes("MISC")) {
              data['type'] = "misc";
          }
          else if (row["DESCRIPTION"].includes("REDEMPTION")) {
              data['type'] = "redemption";
          }
          else if (row["DESCRIPTION"].includes("TRANSFER")) {
              data['type'] = "transfer";
          }
          else {
              data['type'] = "other";
          }

          var date_array = row["DATE"].split('/');
          data['date'] = date_array[2] + "-" + date_array[0] + "-" + date_array[1];

          data['symbol'] = row['SYMBOL'];
          data['amount'] = Number(row["AMOUNT"]);
          data['transaction_id'] = Number(row['TRANSACTION ID']);
          data['quantity'] = Number(row['QUANTITY']);
          data['price'] = Number(row['PRICE']);
          data['reg_fee'] = Number(row['REG FEE']);
          data['commission'] = Number(row['REG FEE']);

          if (data['type'] === "sell" ) data['quantity'] = Number(row['QUANTITY']) * -1; 
              
          rows.push(data);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        seed_data(rows);
    });

}




