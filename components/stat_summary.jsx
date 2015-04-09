/**
 * Summary of all server stats
 */

var React = require('react');

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

module.exports = StatSummary;
