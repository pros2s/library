export const fadeInAnimationInner = function(obj, item, {duration, display, fin}) {
  item.style.display = display || 'block';

  const _fadeIn = (complection) => {
    item.style.opacity = complection;
  };

  const ani = obj.animateOverTime(duration, _fadeIn, fin);
  requestAnimationFrame(ani);
};


export const fadeOutAnimationInner = function(obj, item, {duration, fin}) {
  const _fadeOut = (complection) => {
    item.style.opacity = 1 - complection;

    if (complection === 1) item.style.display = 'none';
  };

  const ani = obj.animateOverTime(duration, _fadeOut, fin);
  requestAnimationFrame(ani);

  item.classList.remove('opacity', 'display');
};
