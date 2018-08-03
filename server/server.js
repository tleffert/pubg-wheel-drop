// Get dependencies
var express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('./data/locations.json', 'utf8'));

var Location  = require('./schemas/LocationSchema');
CONFIG = require('./config.json');
// Get our API routes
// const api = require('./server/routes/api');
// OSCAR POINT  Correct - 17 Missed - 7
const app = express();
mongoose.connect(`mongodb://${CONFIG['dbUser']}:${CONFIG['dbUser-pwd']}@localhost/wheel`);

// Parsers for POST data
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

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
