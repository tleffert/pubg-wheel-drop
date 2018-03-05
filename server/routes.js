var express = require('express');

module.exports = function(app){
    var apiRouter = express.Router();
    // API router, used to catch all routes that re prepended with '/api'
    app.use('/api', apiRouter);

    require('./routes/locationRoutes.js')(apiRouter)
}
