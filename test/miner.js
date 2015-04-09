/**
 * Test miner
 *
 * Fake test miner that broadcasts data to the front end server
 */

var io = require('socket.io-client');

// host path
var HOST = process.env.MINER_HOST || 'http://localhost:3000';
var NAME = process.env.MINER_NAME || 'miner';

// Sample data
var data = {
  "Elapsed": 29619,
  "MHS av": 1.88,
  "MHS 5s": 1.91,
  "Found Blocks": 2,
  "Getworks": 1233,
  "Accepted": 6285,
  "Rejected": 293,
  "Hardware Errors": 0,
  "Utility": 12.73,
  "Discarded": 2286,
  "Stale": 11,
  "Get Failures": 51,
  "Local Work": 5570,
  "Remote Failures": 6,
  "Network Blocks": 814,
  "Total MH": 55679.3856,
  "Work Utility": 1715.97,
  "Difficulty Accepted": 810688,
  "Difficulty Rejected": 37504,
  "Difficulty Stale": 1408,
  "Best Share": 1211553,
  "Device Hardware%": 0,
  "Device Rejected%": 4.4274,
  "Pool Rejected%": 4.4143,
  "Pool Stale%": 0.1657
};

// Send summary data to the host
var sendSummary = function() {
  socket.emit('miner:summary', {id: NAME, summary: data});
};

// connection to remote host
var socket = io.connect(HOST, {
  // Increase delay and reconnect attempts
  // We want to keep trying to reconnect for as long as is reasonable
  'reconnection delay': 500,
  'max reconnection attempts': 1000
});

var sendSummaryInterval;

socket.on('connect', function () {
  console.log('connected to %s', HOST);

  sendSummaryInterval = setInterval(sendSummary, 5000);
  console.log('sendSummary started');
});

socket.on('disconnect', function () {
  console.log('disconnected');

  if (sendSummaryInterval === 0 || sendSummaryInterval) {
    clearInterval(sendSummaryInterval);
  }
});

socket.on('reconnecting', function (delay, attempts) {
  console.log('Attempt %d to reconnect', attempts);
});

