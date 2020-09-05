const axios = require("axios");

const getPrices = (stock, dates) => { 
    return axios(
        {
            "method":"GET",
            "url":`https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=${dates[0]}&to=${dates[1]}&token=bt7eluf48v6ppe5o36v0`,
            // 60 calls/minute
        }
        ).then((response)=>{
        if(response.data['s'] === 'ok') {
            result = {prices: response.data['c']  }
            result.dates = response.data['t'].map( function(unix) {
                return new Date(unix * 1000);
            });
            return result;
        }
        })
        .catch((error)=>{
            console.log("Stock api error with STOCK:  " + symbol)
        })
}

// getPrices('FB', [Math.round(new Date(2019, 1, 1).getTime()/1000), Math.round(new Date(2019, 12, 31).getTime()/1000)] )
// .then((result) =>
//     console.log(result)
// )

const getDividendHistory = (stock) => {
    return axios(
        {
            "method":"GET",
            "url":`https://api.tiingo.com/tiingo/daily/${stock}/prices?startDate=2016-1-1&endDate=2019-12-31&resampleFreq=monthly&token=ab000f13e75392cce7876074b75859a4cdd27c4a`,
            // 500 calls/hour
        }
        )
        .then((response)=>{
            var result = []
            var data = response.data;
            for(var index in data) {
                if (data[index].divCash > 0)
                    result.push( { dividend: data[index].divCash, 
                    date: new Date(data[index].date) })
            }
            return result
            
        })
        .catch((error)=>{
          console.log("Stock api error with STOCK:  " + symbol)
        })
}

// getDividendHistory('MSFT')
// .then((result) => console.log(result));


module.exports = {
    getPrices,
    getDividendHistory
};










