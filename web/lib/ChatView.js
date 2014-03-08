"use strict";
var View = require("../../lib/ChatView"),
    util = require("util");

module.exports = ChatViewWeb;

var $ = document.querySelector.bind(document);

function ChatViewWeb(){
    var message = $("#message"),
        log = $("#log"),
        self = this;

    this.showMessage = function(msg){
        var li = document.createElement("li");
        li.textContent = msg;
        log.appendChild(li);        
    };
    
    $("#inputForm").addEventListener("submit", function(e){
        e.preventDefault();
        self.emit("input", message.value);
        message.value = "";
    });

    this.focus = message.focus.bind(message);
}
util.inherits(ChatViewWeb, View);
