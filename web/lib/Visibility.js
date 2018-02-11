'use strict'
var util = require('util'),
  contact = require('../../lib/contact'),
  Transform = require('stream').Transform

module.exports = Visibility

function Visibility (options) {
  if (!(this instanceof Visibility)) return new Visibility(options)
  options = options || {}
  options.objectMode = true
  Transform.call(this, options)
}
util.inherits(Visibility, Transform)

Visibility.prototype._transform = function (msg, enc, done) {
  if (msg.txt && document.hidden) {
    msg.notify = {
      title: 'New messages',
      body: 'from ' + msg.user
    }
  }
  this.push(msg)
  done()
}
