var socket = io.connect('http://localhost:8080');

socket.on('connect', function () {
  console.log('connected');
});

socket.on('disconnect', function () {
  console.log('disconnected');
});

socket.on('summary', function (data) {
  console.log('Summary', data);
});
