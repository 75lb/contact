"use strict";
var EventEmitter = require("events").EventEmitter,
    util = require("util");

module.exports = Connection;

/**
Adapter adding a unified interface to WebSocket and net.Socket
@constructor
*/
function Connection(websocket){
    var self = this;
    this._socket = websocket;
    this.createdDate = Date.now();

    websocket.onopen = function(){
        self.emit("open");
    };
    websocket.onclose = function(){
        self.emit("close");
    };
    websocket.onmessage = function(msg){
        self.emit("data", msg.data);
    };
    websocket.onerror = function(err){
        self.emit("error", err);
    };

    var keepAlive = setInterval(function(){
        if (self._socket.readyState === 1){
            self.write({ type: "ping" });
        } else {
            clearInterval(keepAlive);
        }
    }, 1000 * 30);
}
util.inherits(Connection, EventEmitter);
Connection.prototype.write = function(msg){
    if (typeof msg === "object") msg = JSON.stringify(msg);
    if (this._socket.write){
        this._socket.write(msg);
    } else {
        this._socket.send(msg);
    }
};
