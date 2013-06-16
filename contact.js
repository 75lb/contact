#!/usr/bin/env node
"use strict";
var net = require("net"),
    readline = require("readline"),
    EventEmitter = require("events").EventEmitter,
    util = require("util"),
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    
var l = console.log,
    port = 6667;

/**
State Machine:
disconnected -> connected -> disconnected
connected -> typing -> connected
*/
function Session(speakingTo, socket){
    var self = this;
    l("New Session with: " + speakingTo.ip);
    this.state = "connected";
    this.speakingTo = speakingTo;
    this.socket = socket;
    this.disconnect = function(){ 
        l("session disconnected");
    };
    this.send = function(msg){
        this.socket.write(msg);
    };
    this.incomingMsg = function(msg){
        this.emit("incomingMsg", msg);
    };
}
util.inherits(Session, EventEmitter);

function User(ip, name){
    this.ip = ip;
    this.name = name;
}

/**
View innerface:
prompt()
showMessage()
-> input(line)
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
    this.prompt = function(){
        rl.prompt();
    };
    this.showMessage = function(msg){
        rl.pause();
        l("\n" + msg.toString());
        rl.prompt(true);
        rl.resume();
    };
    
}
util.inherits(TerminalView, EventEmitter);

function Manager(transport, view){
    transport[process.argv[2] === "-l" ? "listen" : "connect"](function(session){
        view.prompt();
        view.on("input", function(msg){
            session.send(msg);
        });
        session.on("incomingMsg", function(msg){
            view.showMessage(msg);
        });
    });
}

function NodeTransport(){
    this.listen = function(callback){
        l("listening on port " + port);
        var server = net.createServer(function(socket){
            var session = new Session(
                new User(socket.remoteAddress, "<unknown>"),
                socket
            );
            socket.on("end", session.disconnect);
            socket.on("data", function(data){
                session.incomingMsg(data);
            });
            callback(session);
        }).listen(port);
    };
    this.connect = function(callback){
        var socket = net.connect({ port: port, host: process.argv[2] }, function(){
            var session = new Session(
                new User(socket.remoteAddress, "<unknown>"),
                socket
            );
            socket.on("end", session.disconnect);
            socket.on("data", function(data){
                session.incomingMsg(data);
            });
            callback(session);
        });
    }
}

Manager(new NodeTransport(), new TerminalView());
