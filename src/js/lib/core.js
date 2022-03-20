import 'focus-visible';
import lazyImages from './modules/lazyImages';
import documentReady from '../helpers/documentReady';

documentReady(() => {
  lazyImages();
});


const $ = function (selector) {
  return new $.prototype.Init(selector);
};

$.prototype.Init = function (selector) {
  if (!selector) return this;// {}

  Object.assign(this, document.querySelectorAll(selector));
  this.length = document.querySelectorAll(selector).length;
  return this;
};

$.prototype.Init.prototype = $.prototype;
window.$ = $;


export default $;