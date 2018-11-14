(function(app) {
  'use strict';

  var jCore = require('jcore');
  var dom = app.dom || require('../dom.js');
  var Page = app.Page || require('./page.js');

  var Content = jCore.Component.inherits(function() {
    this.top = this.prop(0);
    this.pages = [];
  });

  Content.prototype.scrollHeight = function() {
    var value = dom.innerHeight();
    for (var i = 0, len = this.pages.length; i < len; i++) {
      var page = this.pages[i];
      if (!page.visible()) {
        break;
      }
      value += page.scrollHeight();
    }
    return value;
  };

  Content.prototype.loadPage = function(url) {
    var page = new Page();
    page.parentElement(this.element());
    this.pages.push(page);
    return page.load(url);
  };

  Content.prototype.onredraw = function() {
    this.redrawBy('top', function(top) {
      dom.translateY(this.element(), top);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Content;
  } else {
    app.Content = Content;
  }
})(this.app || (this.app = {}));
