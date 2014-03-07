var util = require("util"),
    Transport = require("./Transport"),
    Session = require("./Session"),
    User = require("./User")
    WebSocket = typeof WebSocket === "undefined" ?  require("ws") : WebSocket;

module.exports = TransportWeb;

function TransportWeb(){
    this.connect = function(options, callback){
        var url = util.format("ws://%s:%s", options.host, options.port || "");

        console.log("opening:", url);
        
        var websocket = new WebSocket(url);
        websocket.onopen = function(){
            var session = new Session(
                new User(url),
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
