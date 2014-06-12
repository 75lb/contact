#!/usr/bin/env node
"use strict";
/**
Terminal client 
*/
var cliArgs = require("command-line-args"),
    dope = require("console-dope"),
    ChatView = require("./lib/ChatView"),
    TransportWebSocket = require("../lib/TransportWebSocket"),
    contact = require("../lib/contact"),
    Notifications = require("../lib/Notifications");

var argv = cliArgs([
    { name: "user", type: String, alias: "u", value: "Lloyd" },
    { name: "server", type: String, alias: "s", value: "serene-stream-2466.herokuapp.com" }
]).parse();

var transport = new TransportWebSocket();

dope.log("Connecting to", argv.server);

var session = transport.connect({ host: argv.server });
contact.user = argv.user;
contact.session = session;

session.on("disconnected", function(){
    dope.clearLine.column(1);
    process.exit(0);
});
session.on("error", function(err){
    dope.log("SESSION ERROR");
    console.dir(err);
});

session.pipe(ChatView())
    .pipe(Notifications())
    .pipe(session);
    
/*
chat history, presence (arrived, left), /me, /who (is online), formatting, ssl, /info (about connection, connected users and their IPS), /ban, /kick, connection keep-alive, 
web client host in query string, notifications

var transportWeb = new TransportWebSocket();
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
        .pipe(notifyVisual) // { type: "action",  data: { user: "B", action: "nods"  }}
        .pipe(notifyAudio)
        .session            // { type: "message", data: { user: "B", msg: "Yes i am" }}

})
*/
