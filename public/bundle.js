(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

exports.timeout  = timeout
exports.interval = interval
exports.throttle = throttle
exports.debounce = debounce
exports.clear    = clear

function timeout(cb, delay, ctx) {
  delay = safe(delay)
  if (ctx === undefined) ctx = this
  var start = Date.now()
  var data = {
  	id: requestAnimationFrame(loop)
  }

  return data

  function loop() {
  	if (Date.now() - start >= delay) return cb.call(ctx)
    data.id = requestAnimationFrame(loop)
  }
}

function interval(cb, delay, ctx) {
  delay = safe(delay)
  if (ctx == undefined) ctx = this
  var start = Date.now()
  var data = {
  	id: requestAnimationFrame(loop)
  }

  return data

  function loop() {
    if ((Date.now() - start) >= delay) {
      cb.call(ctx)
      start = Date.now()
    }
    data.id = requestAnimationFrame(loop)
  }
}

function throttle(cb, delay, ctx) {
  delay = safe(delay)
  var start = 0
  var data = {}
  var args

  function throttled() {
  	if (data.id == null) {
      if (ctx === undefined) ctx = this
  	  args = arguments
  	  data.id = requestAnimationFrame(loop)
  	}
  }

  throttled.immediate = function() {
    clear(data)
    delayed()
  }

  throttled.cancel = function() {
    clear(data)
  }

  return throttled

  function loop() {
    if (delay - (Date.now() - start) <= 0) return delayed()
    data.id = requestAnimationFrame(loop)
  }

  function delayed() {
    start = Date.now()
    data.id = null
    cb.apply(ctx, args)
  }
}

function debounce(cb, delay, ctx) {
  delay = safe(delay)
  var data = {}
  var start
  var args

  function debounced() {
    if (ctx == undefined) ctx = this
    args = arguments

    clear(data)
    start = Date.now()
    data.id = requestAnimationFrame(loop)
  }

  debounced.immediate = function() {
    clear(data)
    delayed()
  }

  debounced.cancel = function() {
    clear(data)
  }

  return debounced

  function loop() {
    if (delay - (Date.now() - start) <= 0) return delayed()
    data.id = requestAnimationFrame(loop)
  }

  function delayed() {
    data.id = null
    cb.apply(ctx, args)
  }
}

function clear(data) {
  if (data && data.id !== undefined) {
    cancelAnimationFrame(data.id)
    data.id = null
  }
}

function safe(delay) {
  return (delay == undefined || typeof delay != 'number' || delay !== delay || delay < 0)
    ? 0
    : delay
}

},{}],2:[function(require,module,exports){

var timeout = require('raf-funcs').timeout
var out = document.querySelector('p[out]')
var a = []
var started = Date.now()
var size = 500
// var size = 40

function next(cb) {
  timeout(cb, 25)
}

function log(msg) {
  if (out.innerHTML == '...') {
    out.innerHTML = msg
  } else {
    out.innerHTML = out.innerHTML + '<br>' + msg
  }
}


function start() {
  return new Promise(function(resolve) {
    log('divs count: ' + (size * size))
    next(resolve)
  })
}

function create() {
  return new Promise(function(resolve) {
    var now = Date.now()
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var d = document.createElement('div')
        d.classList.add('r')
        d.style.left = x + 'px'
        d.style.top  = y + 'px'
        a.push(d)
        document.body.appendChild(d)
      }
    }
    log('create: ' + (Date.now() - now))
    next(resolve)
  })
}

function add() {
  return new Promise(function(resolve) {
    var now = Date.now()
    for (var i = 0, n = a.length; i < n; i++) {
      a[i].classList.add('red')
      a[i].added = true
    }
    log('add: ' + (Date.now() - now))
    next(resolve)
  })
}

function add_test() {
  return new Promise(function(resolve) {
    var now = Date.now()
    for (var i = 0, n = a.length; i < n; i++) {
      if (a[i].added !== true) {
        a[i].classList.add('red')
        a[i].added = true
      }
    }
    log('add_test: ' + (Date.now() - now))
    next(resolve)
  })
}

function remove() {
  return new Promise(function(resolve) {
    var now = Date.now()
    for (var i = 0, n = a.length; i < n; i++) {
      a[i].classList.remove('red')
      a[i].added = false
    }
    log('remove: ' + (Date.now() - now))
    next(resolve)
  })
}

function remove_test() {
  return new Promise(function(resolve) {
    var now = Date.now()
    for (var i = 0, n = a.length; i < n; i++) {
      if (a[i].added === true) {
        a[i].classList.remove('red')
        a[i].added = false
      }
    }
    log('remove_test: ' + (Date.now() - now))
    next(resolve)
  })
}

function toggle() {
  return new Promise(function(resolve) {
    var now = Date.now()
    for (var i = 0, n = a.length; i < n; i++) {
      a[i].classList.toggle('red')
    }
    log('toggle: ' + (Date.now() - now))
    next(resolve)
  })
}

Promise.resolve()
.then(start)
.then(create)
.then(add)
.then(add)
.then(remove)
.then(add_test)
.then(add_test)
.then(remove)
.then(remove)
.then(add)
.then(remove_test)
.then(remove_test)
.then(toggle)
.then(toggle)
.then(toggle)
.then(function() {
  log('done in: ' + (Date.now() - started))
})

},{"raf-funcs":1}]},{},[2]);
