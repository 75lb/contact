var socket = new WebSocket("ws://localhost:4444");

function l(msg){ console.log(msg); }

socket.onopen = function(){
    l("OPEN");
};
socket.onclose = function(){
    l("CLOSE");
};
socket.onmessage = function(msg){
    l(msg);
};
socket.onerror = function(err){
    l("ERROR: ");
    l(err);
};