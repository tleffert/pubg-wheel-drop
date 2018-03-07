// Get dependencies
var express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('./data/locations.json', 'utf8'));

var Location  = require('./schemas/LocationSchema');

// Get our API routes
// const api = require('./server/routes/api');
// OSCAR POINT  Correct - 17 Missed - 7
const app = express();

mongoose.connect('mongodb://localhost/wheel');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// returns an instance of node-greenlock with additional helper methods
var lex = require('greenlock-express').create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  server: 'staging'

// If you wish to replace the default plugins, you may do so here
//
, challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
, store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })

// You probably wouldn't need to replace the default sni handler
// See https://git.coolaj86.com/coolaj86/le-sni-auto if you think you do
//, sni: require('le-sni-auto').create({})

, approveDomains: approveDomains
});

function approveDomains(opts, certs, cb) {
  // This is where you check your database and associated
  // email addresses with domains and agreements and such


  // The domains being approved for the first time are listed in opts.domains
  // Certs being renewed are listed in certs.altnames
  if (certs) {
    opts.domains = certs.altnames;
  }
  else {
    opts.email = 'leffertt@gmail.com';
    opts.agreeTos = true;
  }

  // NOTE: you can also change other options such as `challengeType` and `challenge`
  // opts.challengeType = 'http-01';
  // opts.challenge = require('le-challenge-fs').create({});

  cb(null, { options: opts, certs: certs });
}

// handles acme-challenge and redirects to https
require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
  console.log("Listening for ACME http-01 challenges on", this.address());
});

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
// const port = process.env.PORT || '3000';
// app.set('port', port);

/**
 * Create HTTP server.
 */
// const server = http.createServer(app);
// handles your app
require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});
/**
 * Listen on provided port, on all network interfaces.
 */
// server.listen(port, () => console.log(`API running on localhost:${port}`));
