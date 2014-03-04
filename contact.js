#!/usr/bin/env node

"use strict";
var TransportNode = require("./lib/TransportNode"),
    ViewTerminal = require("./lib/ViewTerminal");

var transport = new TransportNode(),
    view = new ViewTerminal(),
    options = { 
        host: process.argv[2], 
        port: 6667
    };

function monitorSession(session){
    view.on("input", function(msg){
        session.send(msg);
    });
    session.on("incomingMsg", function(msg){
        view.showMessage(msg);
    });
}

if (process.argv[2] === "-l") {
    transport.listen(options, monitorSession)
} else {
    transport.connect(options, monitorSession)
}
