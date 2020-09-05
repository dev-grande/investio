module.exports = app => {

    const db = require('../controllers/data.controller.js')
    var router = require("express").Router();
    
        router.post('/upload', db.uploadData);
        router.delete('/delete', db.deleteYear);
        router.post('/years', db.getYears);
        router.get('/portfolios/:id', db.getPortfolios);
        router.post('/portfolio', db.addPortfolio);
        router.delete('/deleteP', db.deletePortfolio);

        router.get('/dashboard/:id', (request, response) => {
          db.getAllDashboardData(request)
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((err) => {
              response.status(400).json({ status: 400, message: "error with retrieving data" });
            }); 
        });

        router.post('/dashboard', (request, response) => {
          db.getDashboardData(request)
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((err) => {
              response.status(400).json({ status: 400, message: "error with retrieving data" });
            }); 
        });


        router.get('/reports/:id', (request, response) => {
          db.getReportsData(request)
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((err) => {
              response.status(400).json({ status: 400, message: "error with retrieving data" });
            }); 
        });

        router.post('/dividend', (request, response) => {
          db.getStockDivs(request)
            .then((data) => {
              response.status(200).json(data);
            })
            .catch((err) => {
              response.status(400).json({ status: 400, message: "error with retrieving data" });
            }); 
        });
    
        app.use("/data", router);
    
    }
    