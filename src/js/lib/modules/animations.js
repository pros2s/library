import $ from '../core';
import {fadeInAnimationInner, fadeOutAnimationInner} from '../../helpers/AnimationInners';


$.prototype.animateOverTime = function(duration, callback, fin) {
  let timeStart;

  function _animateOverTime(time) {
    if (!timeStart) timeStart = time;

    let timeElapsed = time - timeStart;
    let complection = Math.min(timeElapsed / duration, 1);// for style.opacity(max value = 1)

    callback(complection);

    if (timeElapsed < duration) requestAnimationFrame(_animateOverTime);
    else {
      if (typeof fin === 'function') fin();
    }
  }

  for (let i = 0; i < this.length; i++) {
    if (i === 0) continue;
  }

  return _animateOverTime;
};

$.prototype.fadeIn = function(duration, display, fin) {
  for (let i = 0; i < this.length; i++) {
    fadeInAnimationInner(this, this[i],
      {
        duration,
        display,
        fin
      });
  }

  return this;
};

$.prototype.fadeOut = function(duration, fin) {
  for (let i = 0; i < this.length; i++) {
    fadeOutAnimationInner(this, this[i],
      {
        duration,
        fin
      });
  }

  return this;
};

$.prototype.fadeToggle = function(duration, display, fin) {
  for (let i = 0; i < this.length; i++) {
    if (window.getComputedStyle(this[i]).display === 'none') {
      fadeInAnimationInner(this, this[i],
        {
          duration,
          display,
          fin
        });
    } else {
      fadeOutAnimationInner(this, this[i],
        {
          duration,
          fin
        });
    }
  }

  return this;
};
