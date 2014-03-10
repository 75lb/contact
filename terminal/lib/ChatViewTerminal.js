"use strict";
var readline = require("readline"),
    util = require("util"),
    Transform = require("stream").Transform,
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });

module.exports = ChatViewTerminal;

function ChatViewTerminal(options){
    Transform.call(this, options)
    var self = this;

    rl.on("line", function(line){
        self._writeLine(options.session.me + ": " + line, true);
    });
    rl.on("close", function(){
        process.exit(0);
    });
    rl.prompt();    
}
util.inherits(ChatViewTerminal, Transform);
ChatViewTerminal.prototype._writeLine = function(line, prevLine){
    rl.pause();
    if (prevLine){
        readline.moveCursor(process.stdout, 0, -1);
    }
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    console.log(line.toString());
    rl.prompt(true);
    rl.resume();
}
ChatViewTerminal.prototype._transform = function(msg, enc, done){
    if (msg){
        if (msg.data.msg) this._writeLine(msg.data.msg);
    } else {
        throw new Error("ChatViewTerminal.prototype._transform: msg is empty");
    }
};
