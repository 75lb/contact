"use strict";
var TransportWebSocket = require("../lib/TransportWebSocket"),
    ChatView = require("./lib/ChatView"),
    ConnectView = require("./lib/ConnectView"),
    LoadingView = require("./lib/LoadingView"),
    global = require("../lib/global");

var transport = new TransportWebSocket(),
    options = {  host: "serene-stream-2466.herokuapp.com" },
    view = {
        connect: new ConnectView(),
        chat: new ChatView(),
        loading: new LoadingView()
    };

view.connect.focus();

view.connect.on("connect-as", function(username){
    view.loading.loading(true);

    var session = transport.connect(options);
    session.on("connected", function(){
        global.user = username;
        global.session = session;

        view.loading.loading(false);
        view.connect.setConnected(true);
        view.chat.enabled(true);

        session.pipe(view.chat).pipe(session);
        view.chat.focus();
    });

    session.on("disconnected", function(){
        view.chat.enabled(false);
        view.connect.setConnected(false);
    });

    view.connect.on("disconnect", function(){
        session.close();
    });
});
