"use strict";
var EventEmitter = require("events").EventEmitter,
    util = require("util");

module.exports = Session;

/**
A chat session. Survives disconnects.

State Machine:
disconnected -> connected -> disconnected
connected -> typing -> connected
@constructor
*/
function Session(speakingTo, socket){
    this.state = "connected";
    this.speakingTo = speakingTo;
    this.socket = socket;
    this.me = null;
    this.view = null;
}
util.inherits(Session, EventEmitter);

Session.prototype.disconnect = function(){
    console.dir(this);
    this.view.showMessage("session disconnected");
};
Session.prototype.send = function(msg){
    // console.log("session.send: " + msg)
    var evt = JSON.stringify({ type: "message", data: { user: this.me, msg: msg }});
    if (this.socket.write){
        this.socket.write(evt);
    } else {
        this.socket.send(evt);
    }
};
Session.prototype.incomingMsg = function(msg){
    var evt = JSON.parse(msg);
    if (evt.type === "message"){
        this.view.showMessage(evt.data.user + ": " + evt.data.msg);
    } else {
        // console.dir(evt);
    }
};
Session.prototype.setView = function(view){
    var self = this;
    this.view = view;
    view.on("input", function(line){
        self.send(line);
        self.view.showMessage(self.me + ": " + line, true);
    });
};
