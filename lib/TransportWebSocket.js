"use strict";
var util = require("util"),
    Transport = require("./Transport"),
    Session = require("./Session"),
    User = require("./User"),
    WebSocket = typeof WebSocket === "undefined" ?  require("ws") : WebSocket;

module.exports = TransportWeb;

function TransportWeb(){
    var websocket;
    
    this.connect = function(options, callback){
        var url = util.format("ws://%s:%s", options.host, options.port || "");
        
        websocket = new WebSocket(url);
        console.log("Connecting to " + url);

        websocket.onopen = function(){
            var session = new Session(
                new User(url),
                websocket
            );
            websocket.onclose = session.disconnect.bind(session);
            websocket.onmessage = function(msg){
                session.incomingMsg(msg.data);
            };
            callback(session);
            
            setInterval(function(){
                session.sendRaw({ type: "ping" });
                // console.log("ping");
            }, 1000 * 30);
        }
        websocket.onerror = function(err){
            console.error(err);
        };
    };
    this.close = function(){
        if (websocket){
            websocket.close();
        }
    }
}
util.inherits(TransportWeb, Transport);
