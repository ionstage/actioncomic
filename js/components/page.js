(function(app) {
  'use strict';

  var jCore = require('jcore');

  var Page = jCore.Component.inherits();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Page;
  } else {
    app.Page = Page;
  }
})(this.app || (this.app = {}));
