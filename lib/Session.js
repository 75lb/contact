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
function Session(connection){
    this.state = "connected";
    this.connection = connection;
    this.me = null;
    this.view = null;
}
util.inherits(Session, EventEmitter);

Session.prototype.disconnect = function(){
    this.view.showMessage("session disconnected");
    this.view.removeListener("input", this._inputListener);
    this.emit("close");
};
Session.prototype.send = function(msg){
    var evt = JSON.stringify({ type: "message", data: { user: this.me, msg: msg }});
    this.connection.write(evt);
};
Session.prototype.sendRaw = function(obj){
    var evt = JSON.stringify(obj);
    this.connection.write(evt);
};
Session.prototype.incomingMsg = function(msg){
    if (msg.type === "message"){
        this.view.showMessage(msg.data.user + ": " + msg.data.msg);
    } else {
        // ignore
    }
};
Session.prototype.setView = function(view){
    var self = this;
    this.view = view;
    this._inputListener = function(line){
        self.send(line);
        self.view.showMessage(self.me + ": " + line, true);
    };
    view.on("input", this._inputListener);
};
