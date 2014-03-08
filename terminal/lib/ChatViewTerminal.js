"use strict";
var readline = require("readline"),
    util = require("util"),
    ChatView = require("../../lib/ChatView"),
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });

module.exports = ChatViewTerminal;

function ChatViewTerminal(){
    var self = this;
    rl.on("line", function(line){
        self.emit("input", line);
        rl.prompt();
    });
    rl.on("close", function(){
        process.exit(0);
    });
    this.showMessage = function(msg, prevLine){
        rl.pause();
        if (prevLine){
            readline.moveCursor(process.stdout, 0, -1);
        }
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(msg.toString());
        rl.prompt(true);
        rl.resume();
    };
    rl.prompt();
}
util.inherits(ChatViewTerminal, ChatView);
