/**
 * Main application
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var conf = require('nconf');
var JSX = require('node-jsx').install({extension: '.jsx'});

// Load config
conf
  .argv()
  .env()
  .file('config.json')
  .defaults({
    port: 3000,
    cookie_secret: 'change me!'
  });

var app = express();

// all environments
app.set('port', conf.get('port'));
// View path and engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('default'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// Set secret for cookie
app.use(express.cookieParser(conf.get('cookie_secret')));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  console.log('in dev mode');
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

// List of miners
var miners = [];

// When a user connects...
io.sockets.on('connection', function (socket) {
  // Send summary, which is the array of miner data
  socket.emit('summary', miners);

  // Miner submitted updated summary data
  socket.on('miner:summary', function (data) {
    var found = false;
    var newMiners = [];

    // Replace existing miner data with new data
    miners.forEach(function (miner) {
      var newMiner;

      if (data.id === miner.id) {
        newMiner = data;
        found = true;
      } else {
        newMiner = miner;
      }

      newMiners.push(newMiner);
    });

    if (!found) {
      newMiners.push(data);
    }

    miners = newMiners;

    // Re-emit so browser will see it
    socket.broadcast.emit('summary', miners);
  });
});

