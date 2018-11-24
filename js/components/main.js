(function(app) {
  'use strict';

  var jCore = require('jcore');
  var dom = app.dom || require('../dom.js');
  var Content = app.Content || require('./content.js');

  var Main = jCore.Component.inherits(function() {
    this.width = this.prop(0);
    this.height = this.prop(0);
    this.content = new Content({ element: this.findElement('.content') });
  });

  Main.prototype.oninit = function() {
    this.content.load('content/index.html').then(function() {
      dom.onscroll(this.onscroll.bind(this));
    }.bind(this));
  };

  Main.prototype.onredraw = function() {
    this.redrawBy('width', function(width) {
      dom.css(this.element(), { width: width + 'px' });
    });

    this.redrawBy('height', function(height) {
      dom.css(this.element(), { height: height + 'px' });
    });
  };

  Main.prototype.onscroll = function() {
    this.content.scrollTo(dom.scrollX(), dom.scrollY());
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Main;
  } else {
    app.Main = Main;
  }
})(this.app || (this.app = {}));
