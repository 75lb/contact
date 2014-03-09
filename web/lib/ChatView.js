"use strict";
var View = require("../../lib/ChatView"),
    util = require("util");

module.exports = ChatView;

var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);

function ChatView(){
    var message = $("#message"),
        send = $("#send"),
        log = $("#log"),
        self = this;

    this.showMessage = function(msg){
        var li = document.createElement("li");
        li.textContent = msg;
        log.appendChild(li);
        li.scrollIntoView();
    };

    $("#inputForm").addEventListener("submit", function(e){
        e.preventDefault();
        self.emit("input", message.value);
        message.value = "";
    });

    this.focus = message.focus.bind(message);
    this.enabled = function(enabled){
        if (enabled){
            message.removeAttribute("disabled");
            send.removeAttribute("disabled");
        } else {
            message.setAttribute("disabled", true);
            send.setAttribute("disabled", true);
        }
    };
}
util.inherits(ChatView, View);
