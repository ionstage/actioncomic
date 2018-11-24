(function(app) {
  'use strict';

  var jCore = require('jcore');
  var dom = app.dom || require('../dom.js');
  var Content = app.Content || require('./content.js');

  var Main = jCore.Component.inherits(function() {
    this.contentWidth = this.prop(0);
    this.contentHeight = this.prop(0);
    this.content = new Content({ element: this.findElement('.content') });
  });

  Main.prototype.width = function() {
    return this.contentWidth() + dom.innerWidth();
  };

  Main.prototype.height = function() {
    return this.contentHeight() + dom.innerHeight();
  };

  Main.prototype.overflowX = function() {
    return (this.contentWidth() ? 'visible' : 'hidden');
  };

  Main.prototype.overflowY = function() {
    return (this.contentHeight() ? 'visible' : 'hidden');
  };

  Main.prototype.oninit = function() {
    dom.onresize(this.onresize.bind(this));
    this.content.on('resize', this.oncontentresize.bind(this));
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

    this.redrawBy('overflowX', function(overflowX) {
      dom.css(this.element(), { overflowX: overflowX });
    });

    this.redrawBy('overflowY', function(overflowY) {
      dom.css(this.element(), { overflowY: overflowY });
    });
  };

  Main.prototype.onresize = function() {
    this.markDirty();
  };

  Main.prototype.oncontentresize = function(width, height) {
    this.contentWidth(width);
    this.contentHeight(height);
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
