var net = require("net"),
    util = require("util"),
    Transport = require("./Transport"),
    Session = require("./Session"),
    User = require("./User");

module.exports = NodeTransport;

/**
NodeTransport implementation
@constructor
*/
function NodeTransport(){
    this.listen = function(options, callback){
        console.log("listening on port " + options.port);
        // console.log("listening on port 4444");
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
        
        // var wsServer = new WsServer({ port: 4444});
        // wsServer.on("connection", function(websocket){
        //     var session = new Session(
        //         new User(websocket.remoteAddress, "<unknown>"),
        //         websocket
        //     );
        //     websocket.on("end", session.disconnect);
        //     websocket.on("data", function(data){
        //         // console.dir(data);
        //         session.incomingMsg(data.toString());
        //     });
        //     callback(session);
        // });
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
