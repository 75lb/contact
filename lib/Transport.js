'use strict'
module.exports = Transport

/**
Transport interface.
@constructor
*/
function Transport () {}

/**
Called when a connection is made
@callback NodeTransport~listenCallback
@param {Session} session
*/

/**
Waits for an incoming connection
@param {Object} options - The objects object
@param {Object} options.port - Destination port
@param {NodeTransport~listenCallback} callback Fired on connection
*/
Transport.prototype.listen = function (options, callback) {
  throw new Error('transport.listen() not implemented')
}

/**
Connect to a listening contact
@param {Object} options - The objects object
@param {Object} options.host - Destination host
@param {Object} options.port - Destination port
@param {NodeTransport~listenCallback} callback Fired on connection
*/
Transport.prototype.connect = function (options, callback) {
  throw new Error('transport.listen() not implemented')
}
