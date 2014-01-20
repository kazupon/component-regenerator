var co = require('co');
require('./runtime');

function sleep (ms) {
  return function (fn) {
    setTimeout(fn, ms);
  }
};

var msg = document.querySelector("#msg");
co(function *() {
  for (var i = 0; i <= 5; i++) {
    msg.innerText = i;
    yield sleep(1000);
  }
})();
