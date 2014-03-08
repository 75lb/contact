#!/usr/bin/env node
"use strict";
var Thing = require("nature").Thing,
    ChatViewTerminal = require("./lib/ChatViewTerminal"),
    TransportWeb = require("../lib/TransportWeb");

var argv = new Thing()
    .define({ name: "user", type: "string", alias: "u", value: "Lloyd" })
    .set(process.argv);    

var transport = new TransportWeb();

transport.connect({ host: "serene-stream-2466.herokuapp.com" }, function(session){
    session.setView(new ChatViewTerminal());
    session.me = argv.user;
    session.on("close", function(){
        console.log();
        process.exit(0);
    });
});

/*
chat history, presence (arrived, left), /me, /who (is online), formatting, ssl, /info (about connection, connected users and their IPS), /ban, /kick, connection keep-alive, 
web client host in query string, notifications

var transportWeb = new TransportWeb();
transportWeb.connect({ host: "blah"}, function(session){
    session            // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(history) // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(view)    // { type: "message", data: { user: "B", msg: "Yes i am" }}
        .pipe(slashMe) // { type: "message", data: { user: "B", msg: "Yes i am" }}
        .pipe(history) // { type: "message", data: { user: "B", msg: "Yes i am" }}
        .session       // { type: "message", data: { user: "B", msg: "Yes i am" }}

    session                 // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(viewFile)     // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(viewTerminal) // { type: "message", data: { user: "B", msg: "/me nods" }}
        .pipe(slashMe)      // { type: "action",  data: { user: "B", action: "nods"  }}
        .pipe(viewFile)     // { type: "action",  data: { user: "B", action: "nods"  }}
        .session            // { type: "message", data: { user: "B", msg: "Yes i am" }}

})
*/
