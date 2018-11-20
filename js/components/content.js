(function(app) {
  'use strict';

  var jCore = require('jcore');
  var dom = app.dom || require('../dom.js');

  var Content = jCore.Component.inherits(function() {
    this.top = this.prop(0);
    this.visible = this.prop(false);
  });

  Content.prototype.onredraw = function() {
    this.redrawBy('top', function(top) {
      dom.translateY(this.element(), top);
    });

    this.redrawBy('visible', function(visible) {
      dom.toggleClass(this.element(), 'hide', !visible);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Content;
  } else {
    app.Content = Content;
  }
})(this.app || (this.app = {}));
