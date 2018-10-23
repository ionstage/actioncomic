(function(app) {
  'use strict';

  var dom = app.dom || require('./dom.js');
  var Main = app.Main || require('./components/main.js');

  app.main = new Main({ element: dom.body() });
})(this.app || (this.app = {}));
