var net = require("net"),
    readline = require("readline"),
    EventEmitter = require("events").EventEmitter,
    util = require("util"),
    Transport = require("./Transport"),
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });

module.exports = WebTransport;

function WebTransport(){
    this.connect = function(options, callback){
        var connection = new Connection();
        connection.onOpen = function(){
            l("OPEN");
        };
        connection.onClose = function(){
            l("CLOSE");
        };
        connection.onData = function(data){
            l("DATA:" + data.data);
        };
        connection.onError = function(err){
            l("ERROR", err);
        };

        var socket = new WebSocket(util.format("ws://%s:%s", options.host, options.port));
        socket.onopen = connection.onOpen;
        socket.onclose = connection.onClose;
        socket.onmessage = connection.onData;
        socket.onerror = connection.onError;

        connection.send = function(msg){
            socket.send(msg);
        }
        callback(connection);
    }
}
util.inherits(WebTransport, Transport);
