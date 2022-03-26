import $ from '../core';


$.prototype.accordion = function(activeTrigger, activeContent) {
  for (let i = 0; i < this.length; i++) {
    $(this[i]).click(() => {
      $(this[i]).toggleClass(activeTrigger);
      $(this[i].nextElementSibling).toggleClass(activeContent);

      if (this[i].classList.contains(activeTrigger)) {
        this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + 20 + 'px';
      } else {
        this[i].nextElementSibling.style.maxHeight = 0;
      }
    });
  }
};
