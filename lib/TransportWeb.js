var util = require("util"),
    Transport = require("./Transport"),
    Session = require("./Session"),
    User = require("./User");

module.exports = TransportWeb;

function TransportWeb(){
    this.connect = function(options, callback){
        var websocket = new WebSocket(util.format("ws://%s:%s", options.host, options.port));
        websocket.onopen = function(){
            var session = new Session(
                new User(websocket.remoteAddress, "<unknown>"),
                websocket
            );
            websocket.onclose = session.disconnect;
            websocket.onmessage = function(msg){
                session.incomingMsg(msg);
            };
            websocket.onerror = function(err){
                console.error(err);
            };
            callback(session);
        }
    }
}
util.inherits(TransportWeb, Transport);
