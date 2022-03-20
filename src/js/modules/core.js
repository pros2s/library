import 'focus-visible';
import lazyImages from './lazyImages';
import documentReady from '../helpers/documentReady';

documentReady(() => {
  lazyImages();
});


(() => {
  const $ = function (selector) {
    const elements = document.querySelectorAll(selector);
    const obj = {};

    obj.hide = () => {
      elements.forEach((elem) => {
        elem.style.display = 'none';
      });

      return obj;
    };

    obj.show = () => {
      elements.forEach((elem) => {
        elem.style.display = '';
      });

      return obj;
    };

    obj.toggle = () => {
      elements.forEach((elem) => {
        if (elem.style.display === 'none') elem.style.display = '';
        else elem.style.display = 'none';
      });

      return obj;
    };

    return obj;
  };

  window.$ = $;
})();