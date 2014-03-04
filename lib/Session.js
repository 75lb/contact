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
    var self = this;
    console.log("New Session with: " + speakingTo.ip);
    this.state = "connected";
    this.speakingTo = speakingTo;
    this.socket = socket;
    this.disconnect = function(){
        console.log("session disconnected");
    };
    this.send = function(msg){
        this.socket.write(msg);
    };
    this.incomingMsg = function(msg){
        this.emit("incomingMsg", msg);
    };
}
util.inherits(Session, EventEmitter);
