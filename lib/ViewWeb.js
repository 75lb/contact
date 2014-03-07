"use strict";
var View = require("./View"),
    util = require("util");

module.exports = ViewWeb;

var $ = document.querySelector.bind(document);

function ViewWeb(){
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
        // self.showMessage(message.value);
        self.emit("input", message.value);
        message.value = "";
    });

    message.focus();
}
util.inherits(ViewWeb, View);
