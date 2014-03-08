"use strict";
var util = require("util"),
    EventEmitter = require("events").EventEmitter;

module.exports = ConnectView;

var $ = document.querySelector.bind(document),
    form = $("#connectForm"),
    username = $("#username");

function ConnectView(){
    var self = this;
    form.addEventListener("submit", function(e){
        e.preventDefault();
        var name = username.value;
        if (name){
            self.emit("connect-as", name);
        } else {
            self.focus();
        }
    });
    this.focus = username.focus.bind(username);
}
util.inherits(ConnectView, EventEmitter);
