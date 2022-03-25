import $ from '../core';


$.prototype.modal = function() {
  for (let i = 0; i < this.length; i++) {
    const target = $(this[i]).attribute('data-target');
    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(300);
      document.body.style.overflow = 'hidden';
    });

    document.querySelectorAll(`${target} [data-close]`).forEach((btn) => {
      $(btn).click(() => {
        $(target).fadeOut(300);
        document.body.style.overflow = '';
      });
    });

    $(target).click((e) => {
      if (e.target.classList.contains('modal')) {
        $(target).fadeOut(300);
        document.body.style.overflow = '';
      }
    });
  }
};

$('[data-toggle="modal"]').modal();
