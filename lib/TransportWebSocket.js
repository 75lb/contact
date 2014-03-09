"use strict";
var util = require("util"),
    Transport = require("./Transport"),
    Session = require("./Session"),
    Connection = require("./Connection"),
    WebSocketLib =  require("ws"),
    AvailableWebSocket = typeof WebSocket === "undefined" ? WebSocketLib : WebSocket;

module.exports = TransportWebSocket;

function TransportWebSocket(){
    var websocket;

    this.connect = function(options, callback){
        var url = util.format("ws://%s%s", options.host, options.port ? ":" + options.port : ""),
            pingInterval;

        websocket = new AvailableWebSocket(url);
        console.log("Connecting to " + url);
        
        websocket.onopen = function(){
            var session = new Session(new Connection(websocket));
            
            websocket.onclose = session.disconnect.bind(session);
            websocket.onmessage = function(msg){
                session.incomingMsg(JSON.parse(msg.data));
            };
            callback(session);

            pingInterval = setInterval(function(){
                if (websocket.readyState === AvailableWebSocket.OPEN){
                    session.sendRaw({ type: "ping" });
                } else {
                    clearInterval(pingInterval);
                }
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
util.inherits(TransportWebSocket, Transport);
