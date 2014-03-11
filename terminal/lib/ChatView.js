"use strict";
var readline = require("readline"),
    util = require("util"),
    Message = require("../../lib/Message"),
    global = require("../../lib/global"),
    Transform = require("stream").Transform,
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });

module.exports = ChatView;

function ChatView(options){
    options = options || {};
    options.objectMode = true;
    Transform.call(this, options)
    var self = this;

    rl.on("line", function(line){
        if (global.session.connection.state === 1){
            self._writeLine(global.user + ": " + line, true);
            self.push(new Message({ txt: line }));
        }
    });
    // rl.on("close", function(){
    //     process.exit(0);
    // });
    
    
    global.session.on("connected", function(){
        rl.prompt();    
    });
}
util.inherits(ChatView, Transform);

ChatView.prototype._writeLine = function(line, prevLine){
    rl.pause();
    if (prevLine){
        readline.moveCursor(process.stdout, 0, -1);
    }
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    console.log(line.toString());
    rl.prompt(true);
    rl.resume();
};

ChatView.prototype._transform = function(msg, enc, done){
    if (msg.txt){
        this._writeLine(msg.user + ": " + msg.txt);
    } else if (msg.action){
        this._writeLine(msg.user + " " + msg.action);
    } else {
        // this._writeLine(JSON.stringify(msg));
    }
    this.push(msg);
    done();
};
