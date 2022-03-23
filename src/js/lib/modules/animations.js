import $ from '../core';


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
    this[i].style.display = display || 'block';

    const _fadeIn = (complection) => {
      this[i].style.opacity = complection;
    };

    const ani = this.animateOverTime(duration, _fadeIn, fin);
    requestAnimationFrame(ani);
  }

  return this;
};

$.prototype.fadeOut = function(duration, fin) {
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = (complection) => {
      this[i].style.opacity = 1 - complection;

      if (complection === 1) this[i].style.display = 'none';
    };

    const ani = this.animateOverTime(duration, _fadeOut, fin);
    requestAnimationFrame(ani);

    this[i].classList.remove('opacity', 'display');
  }

  return this;
};
