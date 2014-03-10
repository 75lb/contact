"use strict";
var EventEmitter = require("events").EventEmitter,
    stream = require("stream"),
    Duplex = stream.Duplex,
    util = require("util"),
    Message = require("./Message");

module.exports = Session;

/**
A chat session. Survives disconnects.
@constructor
*/
function Session(options){
    Duplex.call(this, options);
    var self = this;
    
    this.connection = options.connection;
    this.me = null;
    this.view = null;
    
    this.connection.on("data", function(data){
        data = JSON.parse(data);
        data.session = this;
        self.push(data);
    });
    this.connection.on("open", function(){
        self.emit("connected");
    });
    this.connection.on("close", function(){
        self.emit("disconnected");
    });
}
util.inherits(Session, Duplex);
Session.prototype._read = function(){};
Session.prototype._write = function(msg, enc, done){
    this.connection.write(msg);
};
// Session.prototype.close = function(){
//     var msg = new Message(this.me);
//     msg.system = "session disconnected";
//     this.push(null);
// };
// Session.prototype.incomingMsg = function(msg){
//     this.push(msg);
// };
