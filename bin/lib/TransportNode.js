"use strict";
var net = require("net"),
    util = require("util"),
    Transport = require("../../lib/Transport"),
    Session = require("../../lib/Session"),
    User = require("../../lib/User");

module.exports = NodeTransport;

/**
NodeTransport implementation
@constructor
*/
function NodeTransport(){
    this.listen = function(options, callback){
        console.log("listening on port " + options.port);

        var server = net.createServer(function(socket){
            var session = new Session(
                new User(socket.remoteAddress, "<unknown>"),
                socket
            );
            socket.on("end", session.disconnect);
            socket.on("data", function(data){
                session.incomingMsg(data);
            });
            callback(session);
        }).listen(options.port);
    };

    this.connect = function(options, callback){
        var socket = net.connect(options, function(){
            var session = new Session(
                new User(socket.remoteAddress, "<unknown>"),
                socket
            );
            socket.on("end", session.disconnect);
            socket.on("data", function(data){
                session.incomingMsg(data);
            });
            callback(session);
        });
    }
}
util.inherits(NodeTransport, Transport);
