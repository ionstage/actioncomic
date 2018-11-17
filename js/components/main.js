(function(app) {
  'use strict';

  var jCore = require('jcore');
  var dom = app.dom || require('../dom.js');
  var Content = app.Content || require('./content.js');

  var Main = jCore.Component.inherits(function() {
    this.height = this.prop(0);
    this.content = new Content({ element: this.findElement('.content') });
  });

  Main.prototype.oninit = function() {
    dom.onresize(this.onresize.bind(this));
    this.content.on('load', this.onload.bind(this));
  };

  Main.prototype.onredraw = function() {
    this.redrawBy('height', function(height) {
      dom.css(this.element(), { height: height + 'px' });
    });
  };

  Main.prototype.onresize = function() {
    this.height(this.content.scrollHeight());
  };

  Main.prototype.onload = function() {
    this.height(this.content.scrollHeight());
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Main;
  } else {
    app.Main = Main;
  }
})(this.app || (this.app = {}));
