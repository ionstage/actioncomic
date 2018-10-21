(function(app) {
  'use strict';

  var dom = {};

  dom.body = function() {
    return document.body;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dom;
  } else {
    app.dom = dom;
  }
})(this.app || (this.app = {}));
