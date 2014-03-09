"use strict";
var EventEmitter = require("events").EventEmitter,
    util = require("util");

module.exports = ChatView;

/**
The main chat user interface (collection and display of messages)

innerface:
showMessage()
event-> input(line)

@constructor
*/
function ChatView(){}
ChatView.prototype.showMessage = function(){
    throw new Error("chatView.showMessage not overridden");
}
util.inherits(ChatView, EventEmitter);
