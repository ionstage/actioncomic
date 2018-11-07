(function(app) {
  'use strict';

  var jCore = require('jcore');
  var dom = app.dom || require('../dom.js');

  var Page = jCore.Component.inherits(function() {
    this.scrollHeight = this.prop(624);
  });

  Page.prototype.height = function() {
    return dom.offsetHeight(this.element());
  };

  Page.prototype.load = function(url) {
    return new Promise(function(resolve) {
      dom.once(this.element(), 'load', function() {
        resolve();
      });
      dom.attr(this.element(), { src: url });
    }.bind(this));
  };

  Page.prototype.render = function() {
    return dom.render(Page.HTML_TEXT);
  };

  Page.HTML_TEXT = '<iframe class="page"></iframe>';

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Page;
  } else {
    app.Page = Page;
  }
})(this.app || (this.app = {}));
