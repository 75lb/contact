'use strict'
var util = require('util'),
  Transform = require('stream').Transform,
  Message = require('../../lib/Message'),
  contact = require('../../lib/contact')

module.exports = ChatView

var $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document)

function ChatView (options) {
  options = options || {}
  options.objectMode = true
  Transform.call(this, options)

  var message = $('#message'),
    send = $('#send'),
    self = this

  $('#inputForm').addEventListener('submit', function (e) {
    e.preventDefault()
    self._writeLine(contact.user + ': ' + message.value)
    self.push(new Message({ txt: message.value }))
    message.value = ''
    self.focus()
  })

  this.focus = message.focus.bind(message)
  this.enabled = function (enabled) {
    if (enabled) {
      message.removeAttribute('disabled')
      send.removeAttribute('disabled')
    } else {
      message.setAttribute('disabled', true)
      send.setAttribute('disabled', true)
    }
  }
}
util.inherits(ChatView, Transform)

ChatView.prototype._writeLine = function (msg) {
  var log = $('#log'),
    li = document.createElement('li')
  li.textContent = msg
  log.appendChild(li)
  li.scrollIntoView()
}

ChatView.prototype._transform = function (msg, enc, done) {
  if (msg.txt) {
    this._writeLine(msg.user + ': ' + msg.txt)
  } else if (msg.action) {
    this._writeLine(msg.user + ' ' + msg.action)
  } else {
        // this._writeLine(JSON.stringify(msg));
  }
  this.push(msg)
  done()
}
