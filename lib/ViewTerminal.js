var readline = require("readline"),
    util = require("util"),
    View = require("./View"),
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });

module.exports = ViewTerminal;

function ViewTerminal(){
    var self = this;
    rl.on("line", function(line){
        self.emit("input", line);
        rl.prompt();
    });
    rl.on("close", function(){
        process.exit(0);
    });
    this.showMessage = function(msg){
        rl.pause();
        console.log("\n" + msg.toString());
        rl.prompt(true);
        rl.resume();
    };
    rl.prompt();
}
util.inherits(ViewTerminal, View);
