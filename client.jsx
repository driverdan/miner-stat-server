/** @jsx React.DOM */

/**
 * Client script that runs in the browser
 */

var io = require('socket.io-client');
var React = require('react');

var StatSummary = require('./components/stat_summary.jsx');
var ServerList = require('./components/server_list.jsx');

// Initialize socket.io
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
        <ServerList servers={this.state.servers} />
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('statuses')
);
