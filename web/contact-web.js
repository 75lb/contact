"use strict";
var TransportWeb = require("./lib/TransportWeb"),
    ViewWeb = require("./lib/ViewWeb");

var transport = new TransportWeb(),
    options = { 
        host: "serene-stream-2466.herokuapp.com"
    };

transport.connect(options, function(session){
    console.log("BOOM");
    session.setView(new ViewWeb());
    session.me = "Dave";
});
