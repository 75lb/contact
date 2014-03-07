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
}
util.inherits(Session, EventEmitter);

Session.prototype.disconnect = function(){
    console.log("session disconnected");
    clearInterval(id);
};
Session.prototype.send = function(msg){
    // console.log("session.send: " + msg)
    if (this.socket.write){
        this.socket.write(msg);
    } else {
        this.socket.send(msg);
    }
};
Session.prototype.incomingMsg = function(msg){
    this.emit("incomingMsg", msg.data || msg);
};
