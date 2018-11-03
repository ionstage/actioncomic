(function(app) {
  'use strict';

  var dom = {};

  dom.body = function() {
    return document.body;
  };

  dom.render = function(s) {
    var el = document.createRange().createContextualFragment(s).firstChild;
    el.parentNode.removeChild(el);
    return el;
  };

  dom.css = function(el, props) {
    var style = el.style;
    Object.keys(props).forEach(function(key) {
      style[key] = props[key];
    });
  };

  dom.offsetHeight = function(el) {
    return el.offsetHeight;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dom;
  } else {
    app.dom = dom;
  }
})(this.app || (this.app = {}));
