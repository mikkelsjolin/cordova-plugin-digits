var exec = require('cordova/exec');

function noop() {}

var digits = {
  authenticate: function authenticate(options, authenticateSuccess, authenticateFailed) {
    exec(function success(result) {
      (authenticateSuccess || noop)(JSON.parse(result));
    }, authenticateFailed || noop, 'Digits', 'authenticate', [ options ]);
  },

  logout: function logout() {
    exec(noop, noop, 'Digits', 'logout', []);
  }
};

module.exports = digits;
