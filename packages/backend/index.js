'use strict';

require('dotenv').config({path:"./config.env"});
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// const seed = require('./data/seed');
// const stock_service = require("./helpers/stock.service");

var PORT = 4000
var HOST = '0.0.0.0';

if (process.env['PORT']) {
    PORT = process.env['PORT'];
}
if (process.env['HOST']) {
    HOST = process.env['HOST'];
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

require("./routes/users.routes")(app);
require("./routes/data.routes")(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;