"use strict";
var TransportWebSocket = require("../lib/TransportWebSocket"),
    ChatViewWeb = require("./lib/ChatViewWeb");

var transport = new TransportWebSocket(),
    options = { 
        host: "serene-stream-2466.herokuapp.com"
    };

transport.connect(options, function(session){
    console.log("BOOM");
    session.setView(new ChatViewWeb());
    session.me = "Dave";
});
