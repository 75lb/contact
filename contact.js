#!/usr/bin/env node

"use strict";
var Thing = require("nature").Thing,
    TransportNode = require("./lib/TransportNode"),
    ViewTerminal = require("./lib/ViewTerminal"),
    TransportWeb = require("./lib/TransportWeb");

var argv = new Thing()
    .define({ name: "user", type: "string", value: "Lloyd" })
    .set(process.argv);    

var transport = new TransportWeb();

// if (process.argv[2] === "-l") {
//     transport.listen({ port: process.env.PORT || 5000 }, handleSession);
// } else {
//     transport.connect({ port: process.argv[3] || 80, host: process.argv[2] }, handleSession);
// }

transport.connect({ host: "serene-stream-2466.herokuapp.com" }, function(session){
    session.setView(new ViewTerminal());
    session.me = argv.user;
});
