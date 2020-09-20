'use strict';

require('dotenv').config({path:"./config.env"});
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var fs = require('fs');
var http = require('http');
var https = require('https');

var PORT = 4000
var HOST = '0.0.0.0';
if (process.env['PORT'])  PORT = process.env['PORT'];
if (process.env['HOST'])  HOST = process.env['HOST'];

var privateKey, certificate, credentials ;

try {
  privateKey  = fs.readFileSync( process.cwd() + '/certs/localhost-key.pem', 'utf8');
  certificate = fs.readFileSync( process.cwd() + '/certs/localhost.pem', 'utf8');
  credentials = {key: privateKey, cert: certificate};
} catch {
  console.log("certs not found")
}

app.use(  bodyParser.json() );
app.use(  bodyParser.urlencoded({
          extended: true, }));
app.use(cors());
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

require("./routes/users.routes")(app);
require("./routes/data.routes")(app);


if (credentials) {
  https.createServer(credentials, app).listen(PORT, HOST);
  console.log(`Running on https://${HOST}:${PORT}`);
} 
else {
  http.createServer(app).listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
}

console.log(process.env);
module.exports = app;