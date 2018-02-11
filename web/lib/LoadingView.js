'use strict'
var util = require('util'),
  EventEmitter = require('events').EventEmitter

module.exports = LoadingView

var $ = document.querySelector.bind(document),
  $loading = $('#loading')

function LoadingView () {
  this.loading = function (loading) {
    $loading.style.display = loading ? 'block' : 'none'
  }
}
util.inherits(LoadingView, EventEmitter)
