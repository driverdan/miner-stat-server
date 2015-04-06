/** @jsx React.DOM */

var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
  console.log('connected');
});

socket.on('disconnect', function () {
  console.log('disconnected');
});

/**
 * Main app
 */
var App = React.createClass({
  getInitialState: function () {
    socket.on('summary', function (data) {
      this.setState({servers: data});
    }.bind(this));

    return {servers: []};
  },
  render: function () {
    return (
      <div>
        <StatSummary servers={this.state.servers} />
        <Servers servers={this.state.servers} />
      </div>
    );
  }
});

/**
 * Summary of all server stats
 */
var StatSummary = React.createClass({
  render: function () {
    var curHashRate = 0, avgHashRate = 0;

    // Calculate hash rates
    this.props.servers.forEach(function (server) {
      // Cast to numbers
      curHashRate += server.summary['MHS 5s'] * 1;
      avgHashRate += server.summary['MHS av'] * 1;
    });

    return (
      <div className="row">
        <div className="small-6 columns">
          <h2>{curHashRate.toFixed(2)} MH/s <small>{avgHashRate.toFixed(2)} MH/s avg</small></h2>
        </div>
      </div>
    );
  }
});

/**
 * Servers list
 */
var Servers = React.createClass({
  render: function () {
    var servers = this.props.servers.map(function (server) {
      return <Server key={server.id} data={server.summary} />;
    });

    return (
      <div className="row">
        {servers}
      </div>
    );
  }
});

/**
 * Convert seconds to a nice time string
 */
var secondsToString = function (seconds) {
  var days = Math.floor(seconds / 86400),
      hours = Math.floor(seconds % 86400 / 3600),
      minutes = Math.floor(seconds % 86400 % 3600 / 60),
      result = [];

  if (days) {
    result.push(days + ' d');
  }
  if (hours) {
    result.push(hours + ' h');
  }
  if (minutes) {
    result.push(minutes + ' m');
  }

  return result.join(' ');
};

/**
 * Individual server info
 */
var Server = React.createClass({
  render: function () {
    var data = this.props.data;

    var summary = Object.keys(data).map(function (key) {
      return <li><strong>{key}:</strong> {' '} {data[key]}</li>;
    });

    return (
      <div className="small-12 medium-4 columns">
        <div className="panel">
          <h2>{this.props.key}</h2>
          <h3><small>Up {secondsToString(data.Elapsed)}</small></h3>
          <ul>
            {summary}
          </ul>
        </div>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('statuses')
);
