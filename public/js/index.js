// const xtag = require('x-tag');
import xtag from 'x-tag';
console.log('index......');

xtag.register('x-clock', {
  lifycycle: {
    created: function () {
      setInterval(function () {
        this.textContent = new Date().toLocaleTimeString();
      }.bind(this), 1000);
    }
  }
});
