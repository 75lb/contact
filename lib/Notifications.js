"use strict";
var util = require("util"),
    Message = require("./Message"),
    contact = require("./contact"),
    Transform = require("stream").Transform,
    Notification = require("notification-dope");

module.exports = Notifications;

function Notifications(options){
    if (!(this instanceof Notifications)) return new Notifications(options);
    options = options || {};
    options.objectMode = true;
    Transform.call(this, options)
 }
util.inherits(Notifications, Transform);
Notifications.requestPermission = Notification.requestPermission;

Notifications.prototype._transform = function(msg, enc, done){
    if (msg.action === "connected" && msg.received){
        new Notification({ 
            title: msg.user, 
            message: "came online",
            sound: "Ping"
        });
    }
    if (msg.action === "disconnected" && msg.received){
        new Notification({ 
            title: msg.user, 
            message: "went offline",
            sound: "Hero"
        });
    }
    this.push(msg);
    done();
};
