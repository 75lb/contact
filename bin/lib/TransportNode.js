'use strict'
const net = require('net')
const util = require('util')
const Transport = require('../../lib/Transport')
const Session = require('../../lib/Session')
const User = require('../../lib/User')

module.exports = NodeTransport

/**
NodeTransport implementation
@constructor
*/
function NodeTransport () {
  this.listen = function (options, callback) {
    console.log('listening on port ' + options.port)

    const server = net.createServer(function (socket) {
      const session = new Session(
                new User(socket.remoteAddress, '<unknown>'),
                socket
            )
      socket.on('end', session.disconnect)
      socket.on('data', function (data) {
        session.incomingMsg(data)
      })
      callback(session)
    }).listen(options.port)
  }

  this.connect = function (options, callback) {
    const socket = net.connect(options, function () {
      const session = new Session(
                new User(socket.remoteAddress, '<unknown>'),
                socket
            )
      socket.on('end', session.disconnect)
      socket.on('data', function (data) {
        session.incomingMsg(data)
      })
      callback(session)
    })
  }
}
util.inherits(NodeTransport, Transport)
