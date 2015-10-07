import { setup } from './controllers/setup';

window.jQuery = window.$ = require('jquery');
window.Hammer = require('hammerjs');

$(document).ready(() => {

  setup.render();
  !navigator.onLine ? setup.offlineChecker() : null;

});
