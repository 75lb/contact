"use strict";
var TransportWebSocket = require("../lib/TransportWebSocket"),
    ChatView = require("./lib/ChatView"),
    ConnectView = require("./lib/ConnectView");

var transport = new TransportWebSocket(),
    options = {  host: "serene-stream-2466.herokuapp.com" },
    connectView = new ConnectView(),
    chatView = new ChatView();

connectView.focus();

connectView.on("connect", function(username){
    transport.connect(options, function(session){
        console.log("BOOM");
        session.setView(chatView);
        session.me = username;
        chatView.focus();
    });
});
