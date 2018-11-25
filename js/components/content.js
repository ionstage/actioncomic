(function(app) {
  'use strict';

  var jCore = require('jcore');
  var helper = app.helper || require('../helper.js');
  var dom = app.dom || require('../dom.js');

  var Content = jCore.Component.inherits(function() {
    this.x = this.prop(0);
    this.y = this.prop(0);
    this.width = this.prop(0);
    this.height = this.prop(0);
    this.visible = this.prop(false);
    this.module = null;
  });

  Content.prototype.load = function(url) {
    return new Promise(function(resolve) {
      dom.once(this.element(), 'load', function() {
        resolve(dom.contentWindow(this.element()).content.exports);
      }.bind(this));
      dom.attr(this.element(), { src: url });
    }.bind(this)).then(function(module) {
      this.module = module;
      module.onresize = this.onresize.bind(this);
      module.onload();
      this.visible(true);
    }.bind(this));
  };

  Content.prototype.scrollTo = function(scrollX, scrollY) {
    if (!this.module) {
      return;
    }
    var x = helper.clamp(scrollX, 0, this.width());
    var y = helper.clamp(scrollY, 0, this.height());
    this.x(x - scrollX);
    this.y(y - scrollY);
    this.module.onscroll(scrollX, scrollY);
  };

  Content.prototype.onredraw = function() {
    this.redrawBy('x', 'y', function(x, y) {
      dom.translate(this.element(), x, y);
    });

    this.redrawBy('visible', function(visible) {
      dom.toggleClass(this.element(), 'hide', !visible);
    });
  };

  Content.prototype.onresize = function(width, height) {
    this.width(width);
    this.height(height);
    this.emit('resize');
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Content;
  } else {
    app.Content = Content;
  }
})(this.app || (this.app = {}));
