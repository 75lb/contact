'use strict'
var util = require('util'),
  Transport = require('./Transport'),
  Session = require('./Session'),
  Connection = require('./Connection'),
  WebSocketLib = require('ws'),
  AvailableWebSocket = typeof WebSocket === 'undefined' ? WebSocketLib : WebSocket

module.exports = TransportWebSocket

function TransportWebSocket () {
  var websocket

  this.connect = function (options) {
    var url = util.format('ws://%s%s', options.host, options.port ? ':' + options.port : '')

    websocket = new AvailableWebSocket(url)

    return new Session({ connection: new Connection(websocket) })
  }

  this.close = function () {
    websocket.close()
  }
}
util.inherits(TransportWebSocket, Transport)
