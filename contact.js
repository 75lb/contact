#!/usr/bin/env node

"use strict";
var TransportNode = require("./lib/TransportNode"),
    ViewTerminal = require("./lib/ViewTerminal");

var transport = new TransportNode(),
    view = new ViewTerminal();

function handleSession(session){
    view.on("input", function(msg){
        session.send(msg);
    });
    session.on("incomingMsg", function(msg){
        view.showMessage(msg);
    });
}

if (process.argv[2] === "-l") {
    transport.listen({ port: process.env.PORT || 5000 }, handleSession);
} else {
    transport.connect({ port: process.argv[3] || 80, host: process.argv[2] }, handleSession);
}
