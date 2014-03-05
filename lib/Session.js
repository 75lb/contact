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
    var self = this,
        id;
    
    console.log("New Session with: " + speakingTo.ip);
    this.state = "connected";
    this.speakingTo = speakingTo;
    this.socket = socket;
    this.disconnect = function(){
        console.log("session disconnected");
        clearInterval(id);
    };
    this.send = function(msg){
        // console.log("session.send: " + msg)
        if (this.socket.write){
            this.socket.write(msg);
        } else {
            this.socket.send(msg);
        }
    };
    this.incomingMsg = function(msg){
        if (msg.data){
            this.emit("incomingMsg", msg.data);
        } else {
            this.emit("incomingMsg", msg);
        }
    };
    id = setInterval(function(){
        self.send("CLIVE");
    }, 1000);
}
util.inherits(Session, EventEmitter);
