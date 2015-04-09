/**
 * Individual server info
 */

var React = require('react');

/**
 * Convert seconds to a nice time string
 * Put this in its own module if needed elsewhere
 */
var secondsToString = function (seconds) {
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor(seconds % 86400 / 3600);
  var minutes = Math.floor(seconds % 86400 % 3600 / 60);
  var result = [];

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

module.exports = Server;
