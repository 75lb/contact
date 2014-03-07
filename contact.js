#!/usr/bin/env node

"use strict";
var TransportNode = require("./lib/TransportNode"),
    ViewTerminal = require("./lib/ViewTerminal"),
    TransportWeb = require("./lib/TransportWeb");

var transport = new TransportWeb(),
    view = new ViewTerminal();

// if (process.argv[2] === "-l") {
//     transport.listen({ port: process.env.PORT || 5000 }, handleSession);
// } else {
//     transport.connect({ port: process.argv[3] || 80, host: process.argv[2] }, handleSession);
// }

transport.connect({ host: "serene-stream-2466.herokuapp.com" }, function(session){
    view.on("input", session.send.bind(session));
    session.on("incomingMsg", view.showMessage.bind(view));
});
