import 'focus-visible';
import lazyImages from './modules/lazyImages';
import documentReady from '../helpers/documentReady';

documentReady(() => {
  lazyImages();
});


// (() => {
//   const $ = function (selector) {
//     const elements = document.querySelectorAll(selector);
//     const obj = {};

//     obj.hide = () => {
//       elements.forEach((elem) => {
//         elem.style.display = 'none';
//       });

//       return obj;
//     };

//     obj.show = () => {
//       elements.forEach((elem) => {
//         elem.style.display = '';
//       });

//       return obj;
//     };

//     obj.toggle = () => {
//       elements.forEach((elem) => {
//         if (elem.style.display === 'none') elem.style.display = '';
//         else elem.style.display = 'none';
//       });

//       return obj;
//     };

//     return obj;
//   };

//   window.$ = $;
// })();

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