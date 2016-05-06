
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
