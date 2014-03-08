"use strict";
var View = require("../../lib/ChatView"),
    util = require("util"),
    EventEmitter = require("events").EventEmitter;

module.exports = ConnectView;

var $ = document.querySelector.bind(document),
    connect = $("#connect"),
    username = $("#username");

function ConnectView(){
    var self = this;
    connect.addEventListener("click", function(){
        var name = username.value;
        if (name){
            self.emit("connect", name);
        } else {
            self.focus();
        }
    });
    this.focus = username.focus.bind(username);
}
util.inherits(ConnectView, EventEmitter);
