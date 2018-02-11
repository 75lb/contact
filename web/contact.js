'use strict'
/**
Web client
*/
var TransportWebSocket = require('../lib/TransportWebSocket'),
  ChatView = require('./lib/ChatView'),
  ConnectView = require('./lib/ConnectView'),
  LoadingView = require('./lib/LoadingView'),
  Visibility = require('./lib/Visibility'),
  contact = require('../lib/contact'),
  Notifications = require('../lib/Notifications')

var transport = new TransportWebSocket(),
  options = { host: 'serene-stream-2466.herokuapp.com' },
  view = {
    connect: new ConnectView({ requestNotificationPermission: Notifications.requestPermission }),
    chat: new ChatView(),
    loading: new LoadingView()
  }

view.connect.focus()

view.connect.on('connect-as', function (username) {
  view.loading.loading(true)

  var session = transport.connect(options)
  session.on('connected', function () {
    contact.user = username
    contact.session = session

    view.loading.loading(false)
    view.connect.setConnected(true)
    view.chat.enabled(true)

    session
            .pipe(Visibility())
            .pipe(view.chat)
            .pipe(Notifications())
            .pipe(session)

    view.chat.focus()
  })

  session.on('disconnected', function () {
    view.chat.enabled(false)
    view.connect.setConnected(false)
  })
  session.on('error', function (err) {
    console.log('SESSION ERROR')
    console.log(err)
    view.chat.enabled(false)
    view.connect.setConnected(false)
  })

  view.connect.on('disconnect', function () {
    session.close()
  })
})
