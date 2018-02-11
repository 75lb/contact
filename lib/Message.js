var contact = require('./contact')

module.exports = Message

function Message (options) {
  this.user = contact.user
  this.txt = options.txt
  this.sys = options.sys
  this.action = options.action
  this.date = Date.now()
}
