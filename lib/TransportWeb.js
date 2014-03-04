var util = require("util"),
    Transport = require("./Transport"),
    Session = require("./Session"),
    User = require("./User");

module.exports = TransportWeb;

function TransportWeb(){
    this.connect = function(options, callback){
        var socket = new WebSocket(util.format("ws://%s:%s", options.host, options.port));
        socket.onopen = function(){
            var session = new Session(
                new User(socket.remoteAddress, "<unknown>"),
                socket
            );
            socket.onclose = session.disconnect;
            socket.onmessage = function(msg){
                session.incomingMsg(msg);
            };
            callback(session);
        }
    }
}
util.inherits(TransportWeb, Transport);
