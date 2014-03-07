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
        this.emit("incomingMsg", evt.data.user + ": " + evt.data.msg);
    } else {
        // console.dir(evt);
    }
};
