var global = require("./global");

module.exports = Message;

function Message(options){
    this.user = global.user;
    this.txt = options.txt;
    this.sys = options.sys;
    this.action = options.action;
    this.date = Date.now();
}
