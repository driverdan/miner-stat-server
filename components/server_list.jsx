/**
 * Servers list
 */

var React = require('react');
var Server = require('./server.jsx');

var ServerList = React.createClass({
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

module.exports = ServerList;
