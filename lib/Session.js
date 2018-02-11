'use strict'
var EventEmitter = require('events').EventEmitter,
  stream = require('stream'),
  Duplex = stream.Duplex,
  util = require('util'),
  Message = require('./Message')

module.exports = Session

/**
A chat session. Survives disconnects.
@extends Duplex
*/
function Session (options) {
  options = options || {}
  options.objectMode = true
  Duplex.call(this, options)

  var self = this
  this.connection = options.connection

  this.connection.on('data', function (msg) {
    msg = JSON.parse(msg)
    msg.received = true
    if (msg.action === 'connected') {
      msg.notify = { title: msg.user + ' came online' }
    }
    if (msg.action === 'disconnected') {
      msg.notify = { title: msg.user + ' went offline' }
    }
    self.push(msg)
  })
  this.connection.on('open', function () {
    self.emit('connected')
    self.push(new Message({ action: 'connected' }))
  })
  this.connection.on('close', function () {
    self.emit('disconnected')
  })
  this.connection.on('error', function (err) {
    self.emit('error', err)
  })
}
util.inherits(Session, Duplex)
Session.prototype._read = function () {}
Session.prototype._write = function (msg, enc, done) {
  this.connection.write(msg)
  done()
}
Session.prototype.close = function () {
  this.push(new Message({ action: 'disconnected' }))
  this.connection.close()
}
