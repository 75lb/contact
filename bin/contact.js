#!/usr/bin/env node
'use strict'

const cliArgs = require('command-line-args')
const dope = require('console-dope')
const ChatView = require('./lib/ChatView')
const TransportWebSocket = require('../lib/TransportWebSocket')
const contact = require('../lib/contact')
const Notifications = require('../lib/Notifications')

const argv = cliArgs([
  { name: 'user', type: String, alias: 'u', defaultValue: 'Lloyd' },
  { name: 'server', type: String, alias: 's', defaultValue: 'serene-stream-2466.herokuapp.com' }
])

const transport = new TransportWebSocket()

console.log('Connecting to', argv.server)

const session = transport.connect({ host: argv.server })
contact.user = argv.user
contact.session = session

session.on('disconnected', function () {
  dope.clearLine.column(1)
  process.exit(0)
})
session.on('error', handleError)

function handleError (err) {
  dope.error('SESSION ERROR')
  console.dir(err)
}

session.pipe(ChatView()).on('error', handleError)
  .pipe(Notifications()).on('error', handleError)
  .pipe(session).on('error', handleError)

/*
chat history, presence (arrived, left), /me, /who (is online), formatting, ssl, /info (about connection, connected users and their IPS), /ban, /kick, connection keep-alive,
web client host in query string, notifications

const transportWeb = new TransportWebSocket();
transportWeb.connect({ host: "blah"}, function(session){
    session            // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(history) // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(view)    // { type: "message", data: { user: "B", msg: "Yes i am" }}
        .pipe(slashMe) // { type: "message", data: { user: "B", msg: "Yes i am" }}
        .pipe(history) // { type: "message", data: { user: "B", msg: "Yes i am" }}
        .session       // { type: "message", data: { user: "B", msg: "Yes i am" }}

    session                 // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(viewFile)     // { type: "message", data: { user: "A", msg: "you there?" }}
        .pipe(viewTerminal) // { type: "message", data: { user: "B", msg: "/me nods" }}
        .pipe(slashMe)      // { type: "action",  data: { user: "B", action: "nods"  }}
        .pipe(viewFile)     // { type: "action",  data: { user: "B", action: "nods"  }}
        .pipe(notifyVisual) // { type: "action",  data: { user: "B", action: "nods"  }}
        .pipe(notifyAudio)
        .session            // { type: "message", data: { user: "B", msg: "Yes i am" }}

})
*/
