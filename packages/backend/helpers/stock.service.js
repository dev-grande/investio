// const fetch = require("node-fetch");
const axios = require("axios");

const getStockPrice = (stock) => {
    return axios(
        // {
        // "method":"GET",
        // "url":`https://investors-exchange-iex-trading.p.rapidapi.com/stock/${stock.symbol}/ohlc`,
        // "headers":{
        // "content-type":"application/octet-stream",
        // "x-rapidapi-host":"investors-exchange-iex-trading.p.rapidapi.com",
        // "x-rapidapi-key":"e0f2a9bbb0msheeae280a3d53abap1e3b4djsn9843f9bf8e19",
        // "useQueryString":true
        // }
        // }
        {
            "method":"GET",
            "url":`https://investors-exchange-iex-trading.p.rapidapi.com/stock/${stock.symbol}/book`,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"investors-exchange-iex-trading.p.rapidapi.com",
            "x-rapidapi-key":"e0f2a9bbb0msheeae280a3d53abap1e3b4djsn9843f9bf8e19",
            "useQueryString":true
            }
        }
        )
        .then((response)=>{
            var new_stock = {symbol: stock.symbol, quantity: Number(stock.quantity) }

            // new_stock.price = Number(Number(response.data.close.price).toFixed(2))
            // new_stock.amount = Number((Number(response.data.close.price) * new_stock.quantity).toFixed(2));
            var prev_close = response.data.quote.close;
            if (response.data.quote.close === response.data.quote.latestPrice)
            prev_close = response.data.quote.open;
            new_stock.close = Number(Number(prev_close).toFixed(2));

            new_stock.price = Number(Number(response.data.quote.latestPrice).toFixed(2))
            new_stock.amount = Number(Number((Number(response.data.quote.latestPrice) * new_stock.quantity).toFixed(2)));
            
            new_stock.change = Number((Number(response.data.quote.latestPrice) - Number(new_stock.close)).toFixed(2));
            new_stock.percent = Number(Number((new_stock.change / new_stock.price)*100).toFixed(2));

            return new_stock;
        })
        .catch((error)=>{
          console.log("Stock api error with STOCK:  " + symbol)
        })
}


function getAllStockData(stocks){
    return Promise.all(stocks.map(getStockPrice));
}

module.exports = {
    getAllStockData
};

// {
//     "open":
//     {
//         "price":208.7
//         "time":1597411801535
//     }
//     "close":
//     {
//         "price":208.9
//         "time":1597435200405
//     }
//     "high":209.59
//     "low":207.51
//     }
// }









