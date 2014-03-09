"use strict";
var TransportWebSocket = require("../lib/TransportWebSocket"),
    ChatView = require("./lib/ChatView"),
    ConnectView = require("./lib/ConnectView"),
    LoadingView = require("./lib/LoadingView");

var transport = new TransportWebSocket(),
    options = {  host: "serene-stream-2466.herokuapp.com" },
    connectView = new ConnectView(),
    chatView = new ChatView(),
    loadingView = new LoadingView();

connectView.focus();

connectView.on("connect-as", function(username){
    loadingView.loading(true);
    transport.connect(options, function(session){
        loadingView.loading(false);
        connectView.setConnected(true);
        chatView.enabled(true);

        session.setView(chatView);
        session.me = username;
        chatView.focus();
        
        session.on("close", function(){
            chatView.enabled(false);
            connectView.setConnected(false);
        });
    });
});

connectView.on("disconnect", function(){
    transport.close();
    connectView.setConnected(false);
});

