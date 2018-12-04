(function(window) {
  Object.defineProperty(window, 'content', {
    value: Object.create(Object.prototype, {
      load: {
        value: function(props) {
          this.exports.onload = props.onload;
          this.exports.onscroll = props.onscroll;
        },
      },
      resize: {
        value: function(width, height) {
          this.exports.onresize.call(null, width, height);
        },
      },
      changeBackgroundColor: {
        value: function(color) {
          this.exports.onchangebackgroundcolor.call(null, color);
        },
      },
      exports: {
        value: Object.create(Object.prototype, {
          onload: { value: function() {}, writable: true },
          onscroll: { value: function() {}, writable: true },
          onresize: { value: function() {}, writable: true },
          onchangebackgroundcolor: { value: function() {}, writable: true },
        }),
      },
    }),
  });
})(this);
