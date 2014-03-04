#!/usr/bin/env node

"use strict";
var net = require("net"),
    readline = require("readline"),
    EventEmitter = require("events").EventEmitter,
    util = require("util"),
    NodeTransport = require("./lib/NodeTransport"),
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });

var l = console.log,
    port = 6667;

/**
The main chat user interface (collection and display of messages)

innerface:
showMessage()
event-> input(line)

@constructor
*/
function TerminalView(){
    var self = this;
    rl.on("line", function(line){
        self.emit("input", line);
        rl.prompt();
    });
    rl.on("close", function(){
        process.exit(0);
    });
    this.showMessage = function(msg){
        rl.pause();
        l("\n" + msg.toString());
        rl.prompt(true);
        rl.resume();
    };
    rl.prompt();
}
util.inherits(TerminalView, EventEmitter);

function Manager(transport, view){
    transport[process.argv[2] === "-l" ? "listen" : "connect"]({ host: process.argv[2], port: port }, function(session){
        view.on("input", function(msg){
            session.send(msg);
        });
        session.on("incomingMsg", function(msg){
            view.showMessage(msg);
        });
    });
}

Manager(new NodeTransport(), new TerminalView());

