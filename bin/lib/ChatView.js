'use strict'
var readline = require('readline'),
  util = require('util'),
  Message = require('../../lib/Message'),
  contact = require('../../lib/contact'),
  Transform = require('stream').Transform,
  rl = readline.createInterface({ input: process.stdin, output: process.stdout })

module.exports = ChatView

/**
@extends Transform
*/
function ChatView (options) {
  if (!(this instanceof ChatView)) return new ChatView(options)
  options = options || {}
  options.objectMode = true
  Transform.call(this, options)
  var self = this

  rl.on('line', function (line) {
    if (contact.session.connection.state === 1) {
      writeLine(contact.user + ': ' + line, true)
      self.push(new Message({ txt: line }))
    }
  })

  contact.session.on('connected', function () {
    rl.prompt()
  })

  rl.on('SIGINT', function () {
    contact.session.close()
  })
}
util.inherits(ChatView, Transform)

ChatView.prototype._transform = function (msg, enc, done) {
  if (msg.txt) {
    writeLine(msg.user + ': ' + msg.txt)
  } else if (msg.action) {
    writeLine(msg.user + ' ' + msg.action)
  } else {
        // writeLine(JSON.stringify(msg));
  }
  this.push(msg)
  done()
}

function writeLine (line, prevLine) {
  rl.pause()
  if (prevLine) {
    readline.moveCursor(process.stdout, 0, -1)
  }
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0)
  console.log(line.toString())
  rl.prompt(true)
  rl.resume()
}
