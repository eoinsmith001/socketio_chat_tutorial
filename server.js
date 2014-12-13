var express = require('express');
var app = express();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var url  = require('url');

app.get('*', function(req,res) {
  var pathname = url.parse(req.url).pathname;
  console.log( "received request for " + pathname );
  var options = {
    root: __dirname
  };
  // without building a proper router, this conditional
  //  allows to separate html and js for client side
  if (pathname=="/") {
    res.sendFile('/public/views/index.html', options);
  } else if (pathname="/index.js") {
    res.sendFile('/public/js/index.js', options);
  }
});

io.on( 'connection', function(socket) {
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log( "Message: " + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var port = process.env.PORT || 8085;

http.listen(port,function(){
  console.log( "listening on %d", port );
});
