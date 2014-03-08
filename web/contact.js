"use strict";
var TransportWeb = require("../lib/TransportWeb"),
    ChatViewWeb = require("../lib/ChatViewWeb");

var transport = new TransportWeb(),
    options = { 
        host: "serene-stream-2466.herokuapp.com"
    };

transport.connect(options, function(session){
    console.log("BOOM");
    session.setView(new ChatViewWeb());
    session.me = "Dave";
});
