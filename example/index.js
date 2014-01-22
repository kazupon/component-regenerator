require('./generator-runtime');
require('setImmediate');
var co = require('co');

function sleep (ms) {
  return function (fn) {
    setTimeout(fn, ms);
  }
};

function error (ms) {
  return function (fn) {
    throw new Error('error');
  }
}

var msg = document.querySelector("#msg");
co(function *() {
  for (var i = 0; i <= 5; i++) {
    msg.innerText = i;
    yield sleep(1000);
  }
})();

co(function *() {
  try {
    yield error(1000);
  } catch (e) {
    console.log(e);
  }
})();
