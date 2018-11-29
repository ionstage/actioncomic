(function(app) {
  'use strict';

  var dom = {};

  dom.body = function() {
    return document.body;
  };

  dom.attr = function(el, props) {
    Object.keys(props).forEach(function(key) {
      el.setAttribute(key, props[key]);
    });
  };

  dom.css = function(el, props) {
    var style = el.style;
    Object.keys(props).forEach(function(key) {
      style[key] = props[key];
    });
  };

  dom.toggleClass = function(el, className, force) {
    if (force) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  };

  dom.transform = function(el, value) {
    dom.css(el, {
      transform: value,
      webkitTransform: value,
    });
  };

  dom.translate = function(el, x, y) {
    dom.transform(el, 'translate(' + x + 'px, ' + y + 'px)');
  };

  dom.scrollX = function() {
    return window.pageXOffset;
  };

  dom.scrollY = function() {
    return window.pageYOffset;
  };

  dom.innerWidth = function() {
    return window.innerWidth;
  };

  dom.innerHeight = function() {
    return window.innerHeight;
  };

  dom.contentWindow = function(iframe) {
    return iframe.contentWindow;
  };

  dom.on = function(el, type, listener, useCapture) {
    el.addEventListener(type, listener, !!useCapture);
  };

  dom.off = function(el, type, listener, useCapture) {
    el.removeEventListener(type, listener, !!useCapture);
  };

  dom.once = function(el, type, listener, useCapture) {
    var wrapper = function() {
      dom.off(el, type, wrapper, useCapture);
      listener.apply(null, arguments);
    };
    dom.on(el, type, wrapper, useCapture);
  };

  dom.onresize = function(listener, useCapture) {
    dom.on(window, 'resize', listener, useCapture);
  };

  dom.onscroll = function(listener, useCapture) {
    dom.on(window, 'scroll', listener, useCapture);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dom;
  } else {
    app.dom = dom;
  }
})(this.app || (this.app = {}));
