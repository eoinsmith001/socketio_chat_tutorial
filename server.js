var express = require('express');
var app = express();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function(req,res) {
  var options = {
    root: __dirname
  };
  res.sendFile('/public/views/index.html', options);
});

io.on( 'connection', function(socket) {
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var port = process.env.PORT || 8085;

http.listen(port,function(){
  console.log( "listening on %d", port );
});
