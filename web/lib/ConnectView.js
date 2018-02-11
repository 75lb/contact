'use strict'
var util = require('util'),
  EventEmitter = require('events').EventEmitter

module.exports = ConnectView

var $ = document.querySelector.bind(document)

function ConnectView (options) {
  var self = this,
    form = $('#connectForm'),
    connect = $('#connect'),
    username = $('#username')

  this.connected = null
  this.focus = username.focus.bind(username)
  this.setConnected = function (connected) {
    this.connected = connected
    if (connected) {
      username.setAttribute('disabled', true)
    } else {
      username.removeAttribute('disabled')
    }
    connect.value = connected ? 'Disconnect' : 'Connect'
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (options.requestNotificationPermission) options.requestNotificationPermission()
    var name = username.value
    if (self.connected) {
      self.emit('disconnect')
    } else {
      if (name) {
        self.emit('connect-as', name)
      } else {
        self.focus()
      }
    }
  })
}
util.inherits(ConnectView, EventEmitter)
