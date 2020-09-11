const csv = require('csv-parser');
const fs = require('fs');
const pool_module = require('../helpers/pool');
const pool = pool_module.pool;
const stock_service = require('../helpers/stock.service');

var user_id = 1;
var portfolio_name = "After Tax";

const years = [2016, 2017, 2018, 2019]
const actions = ['buy new', 'buy new', 'buy more', 'buy more', 'buy more', 'sell']
const sell_fraction = [1, 2, 4, 4, 5, 5, 10, 10];

var stocks = {};
var dividend_stocks = []

function readCsv(file, data){
    return new Promise((resolve, reject) => {
    fs.createReadStream(process.cwd() + file)  
      .pipe(csv())
      .on('data', (row) => {
        data.push(Object.values(row)[0])
      })
      .on('end', () => {resolve(); })
      .on('error', reject)}
    );
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUNIXdate (date) {
    return Math.round(date.getTime()/1000);
}
function getUNIXdates (year) {
    return [Math.round(new Date(year, 1, 1).getTime()/1000), Math.round(new Date(year, 12, 31).getTime()/1000)]
}

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}

function getDateString(date) {
    return date.toISOString().split('T')[0];
}

async function getPriceHistory(symbol) {
    for(var i in years) {
        var result = await stock_service.getPrices(symbol,  getUNIXdates(Number(years[i])))
        stocks[symbol].dates[years[i]] = result;
    } 
}

function getClosestDateAfter(dates, date) {
    dates.sort(function(a, b) {
        var distancea = Math.abs(date - a);
        var distanceb = Math.abs(date - b);
        return distancea - distanceb; // sort a before b when the distance is smaller
    });
    return dates.filter(function(d) { return d - date > 0; })[0];
}

function get_price_date(date, stock) {
    var year = date.getFullYear();
    var result = {date: date, ok: true};
    var data = stocks[stock].dates[year]; 
        if (data === undefined || !('dates' in data)) return {ok: false}  // checks if the year has stored data
    var index = data.dates.indexOf(date);

    if (index === -1 ) // random date generated is a weekend or not in data
    {
        var dates_sorted = data.dates.slice(0);     // making a copy to not modify original array
        result.date = getClosestDateAfter(dates_sorted, date);
            if (result.date === undefined) return {ok: false};
        result.price = data.prices[data.dates.indexOf(result.date)];
    } 
    else result.price = data.prices[index];
    return result
}

function decideQuantity(price) {
    var quantity = 1;
    if (price < 20)         quantity = 25;
    else if (price < 50)    quantity = 10;
    else if (price < 100)   quantity = 5;
    return quantity;
}

function insertTransaction(date_string, type, amount, stock_symbol, quantity, price) {
    return pool.query("INSERT INTO raw_data (user_id, portfolio, date, transaction_id, \
        type, amount, symbol, quantity, price) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) \
        ON CONFLICT DO NOTHING",  [user_id, portfolio_name, date_string, uniqueID(), type, amount, stock_symbol, quantity, price]
    );
}

function getCurrentQuantity(date_string, stock_symbol) {
    return pool.query("select sum(quantity) as quantity from raw_data where user_id = $1 \
        and portfolio = $2 and date <= $3 and symbol = $4", [user_id, portfolio_name, date_string, stock_symbol ])
    .then((result) => {
        if (result.rows[0]) { 
            return Number(result.rows[0].quantity);
        }
        else return -1;
    })
}

async function buy_sell_transactions(transactions, stock_symbol) {
    for (var index in transactions) {
        var transaction = transactions[index];  
        var entry = true, price = 0, quantity = 0, amount = 0, date_string;

        var result = get_price_date(transaction.date, stock_symbol)
        if (result.ok) {
            transaction.date = result.date;
            price = result.price;
            date_string = getDateString(transaction.date);
        } else {
            entry = false;
        }

        if (transaction.type == 'buy' && entry) {
            quantity = decideQuantity(price);                
        }
        else if (transaction.type == 'sell' && entry) { 
            var cur_quantity = await getCurrentQuantity(date_string, stock_symbol);
            if (cur_quantity > 0) {
                quantity =  -1 * Math.floor(Number(cur_quantity) / 
                            sell_fraction[randomInteger(0, sell_fraction.length - 1)]);
            }
            else entry = false;
        }
        amount = price * quantity *  -1;

        if (entry)  await insertTransaction(date_string, transaction.type, amount, stock_symbol, quantity, price);
    }
}

async function dividend_transactions(stock_symbol) {
    var dividends = [];
    try {
        dividends = await stock_service.getDividendHistory(stock_symbol);
    } catch {
        console.log( "Ran out of getDividendHistory api calls (500 calls/hour)")
    }

    for (var index in dividends) {
        var div_date = dividends[index].date;
        var date_string = getDateString(div_date);
        var current_quantity = await getCurrentQuantity(date_string, stock_symbol);

        if (current_quantity > 0) {
            var earning = dividends[index].dividend * current_quantity;

            await insertTransaction(date_string, 'dividend', earning, stock_symbol, 0, 0);

            var result = get_price_date(div_date, stock_symbol)
            if (result.ok) {
                div_date = result.date;      date_string = getDateString(div_date);
                var price = result.price;
                var quan = earning/price;   

                await insertTransaction(date_string, 'buy', earning * -1, stock_symbol, quan, price);
            }
        }
    }
}

async function PSQLInsert() {
    await pool.query("insert into portfolios (user_id, portfolio) values ($1, $2) on conflict do nothing", [user_id, portfolio_name]);
    await insertTransaction('2016-01-01', 'deposit', 100000, '', 0, 0);

    for (var stock_symbol in stocks) {
        try {
            await getPriceHistory(stock_symbol);
        } catch {
            console.log( "Ran out of getPriceHistory api calls (60 calls/minute)")
        }
        var transactions = stocks[stock_symbol].transactions;

        await buy_sell_transactions( transactions, stock_symbol ); 
        await dividend_transactions( stock_symbol);
    }

    console.log("Finished inserting BUY, SELL, and DIVIDEND transactions to PSQL Database.");
}

async function mock_data(){
    await readCsv('/mock_data/dividend_aristocrats.csv', dividend_stocks);

    for (var ndx in years) {
        for (let i = 0; i <=10; ++i) {  for (let j = 1; j <= 10; ++j) {
                var transaction = {};
                transaction.date = randomDate(new Date(years[ndx], i), new Date(years[ndx], i+1));
                transaction.date.setHours(0,0,0,0);
                transaction.type  = 'buy';

                var symbol = dividend_stocks[randomInteger(0, dividend_stocks.length - 1)];
                var action = actions[randomInteger(0, actions.length - 1)]; 

                if (action === 'buy new' && (Object.keys(stocks).length < 14)) {
                    if (!(symbol in stocks)) {
                        var dates = {};  dates[years[ndx]] = [transaction.date];
                        stocks[symbol] = { dates: dates, transactions: [transaction] };
                    } 
                }
                else { // sell and buy more get from existing stocks
                    if (action === 'sell')  transaction.type  = 'sell'; 
                    var symbols = Object.keys(stocks)
                    if (symbols[0]) {
                        symbol = symbols[randomInteger(0, symbols.length - 1)];
                        stocks[symbol].transactions.push(transaction);
                        if (years[ndx] in stocks[symbol].dates)
                            stocks[symbol].dates[years[ndx]].push(transaction.date);
                        else
                            stocks[symbol].dates[years[ndx]] = [transaction.date];
                    }
                }
        } }
    }
    console.log("Mocking initial data done")
}

module.exports = {
    mock_data,
    PSQLInsert
};



