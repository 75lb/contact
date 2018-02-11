'use strict'
var util = require('util'),
  Message = require('./Message'),
  contact = require('./contact'),
  Transform = require('stream').Transform,
  Notification = require('notification-dope')

module.exports = Notifications

function Notifications (options) {
  if (!(this instanceof Notifications)) return new Notifications(options)
  options = options || {}
  options.objectMode = true
  Transform.call(this, options)
}
util.inherits(Notifications, Transform)
Notifications.requestPermission = Notification.requestPermission

Notifications.prototype._transform = function (msg, enc, done) {
  var self = this
  if (msg.notify) {
	    var notification = new Notification({
      title: msg.notify.title,
      message: msg.notify.body,
      sound: 'Ping'
    })
    notification.on('error', function (err) {
      self.emit('warning', new Error('Notification failed'))
    })
  }
  delete msg.notify
  this.push(msg)
  done()
}
