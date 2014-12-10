console.log( "client side js running" );
var socket = io();
$('form').submit( function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
