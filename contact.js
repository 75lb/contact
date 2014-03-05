#!/usr/bin/env node

"use strict";
var TransportNode = require("./lib/TransportNode"),
    ViewTerminal = require("./lib/ViewTerminal");

var transport = new TransportNode(),
    view = new ViewTerminal(),
    options = { 
        host: process.argv[2], 
        port: process.env.PORT || 5000
    };

function handleSession(session){
    view.on("input", function(msg){
        session.send(msg);
    });
    session.on("incomingMsg", function(msg){
        view.showMessage(msg);
    });
}

if (process.argv[2] === "-l") {
    transport.listen(options, handleSession)
} else {
    transport.connect(options, handleSession)
}
