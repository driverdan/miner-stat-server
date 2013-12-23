/** @jsx React.DOM */

var socket = io.connect('http://localhost:8080');

socket.on('connect', function () {
  console.log('connected');
});

socket.on('disconnect', function () {
  console.log('disconnected');
});

var App = React.createClass({
  render: function () {
    return <Servers />;
  }
});

var Servers = React.createClass({
  getInitialState: function () {
    socket.on('summary', function (data) {
      this.setState({servers: data});
    }.bind(this));

    return {servers: []};
  },
  render: function () {
    var servers = this.state.servers.map(function (server) {
      return <Server key={server.id} data={server.summary} />;
    });

    return (
      <div className="row">
        {servers}
      </div>
    );
  }
});

var Server = React.createClass({
  render: function () {
    var data = this.props.data;

    var summary = Object.keys(this.props.data).map(function (key) {
      return <li><strong>{key}:</strong> {' '} {data[key]}</li>;
    });

    return (
      <div className="small-4 columns">
        <h2>{this.props.key}</h2>
        <ul>
          {summary}
        </ul>
      </div>
    );
  }
});

React.renderComponent(
  <App />,
  document.getElementById('statuses')
);
