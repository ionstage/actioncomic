(function(app) {
  'use strict';

  var jCore = require('jcore');

  var Main = jCore.Component.inherits();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Main;
  } else {
    app.Main = Main;
  }
})(this.app || (this.app = {}));
