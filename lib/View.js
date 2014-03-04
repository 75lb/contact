var EventEmitter = require("events").EventEmitter,
    util = require("util");

module.exports = View;

/**
The main chat user interface (collection and display of messages)

innerface:
showMessage()
event-> input(line)

@constructor
*/
function View(){}
View.prototype.showMessage = function(){
    throw new Error("view.showMessage not overridden");
}
util.inherits(View, EventEmitter);
