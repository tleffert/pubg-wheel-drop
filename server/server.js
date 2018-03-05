// Get dependencies
var express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./data/locations.json', 'utf8'));

var Location  = require('./schemas/LocationSchema');

// Get our API routes
// const api = require('./server/routes/api');
// OSCAR POINT  Correct - 11 Missed - 7 
const app = express();

mongoose.connect('mongodb://localhost/wheel');

Location.count()
.then(function(locationCount){
    if(locationCount == 0) {
        console.log(obj[0]);
        Location.insertMany(obj)
        .then(function(response){
            console.log(response)
        })
        .catch(function(error){
            console.log(error);
        })
    }
})

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// Include our routes for the app
require('./routes')(app);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
