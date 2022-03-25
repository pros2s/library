import $ from '../core';

const ANIMATIONTIME = 300;

$.prototype.modal = function(created) {

  for (let i = 0; i < this.length; i++) {
    const target = $(this[i]).attribute('data-target');

    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(ANIMATIONTIME);
      document.body.style.overflow = 'hidden';
    });

    document.querySelectorAll(`${target} [data-close]`).forEach((btn) => {
      $(btn).click(() => {
        $(target).fadeOut(ANIMATIONTIME);
        document.body.style.overflow = '';
      });
    });

    $(target).click((e) => {
      if (e.target.classList.contains('modal')) {
        $(target).fadeOut(ANIMATIONTIME);
        document.body.style.overflow = '';

        setTimeout(() => {
          if (created) document.querySelector(target).remove();
        }, ANIMATIONTIME);
      }
    });
  }
};

$('[data-toggle="modal"]').modal();


$.prototype.createModal = function({inner, btns} = {}) {
  // eslint-disable-next-line
  const {count, settings} = btns;// btns params

  for (let i = 0; i < this.length; i++) {
    let modalElement = document.createElement('div');
    $(modalElement).addClass('modal');
    $(modalElement).addAttribute('id', $(this[i]).attribute('data-target').slice(1));
    $(modalElement).html(`
    <div class="modal-dialog">
      <div class="modal-content">
        <button class="close" data-close><span>&times;</span></button>
        <div class="modal-header">
          <h3 class="modal-title">${inner.title}</h3>
        </div>
        <div class="modal-body p20">${inner.body}</div>
        <div class="modal-footer">

        </div>
      </div>
    </div>`);

    const buttons = [];
    for (let j = 0; j < count; j++) {
      const button = document.createElement('button');
      $(button).addClass('btn', ...settings[j].classes);
      $(button).html(settings[j].content);

      if (settings[j].callback && typeof settings[j].callback === 'function') {
        $(button).click(settings[j].callback);
      }

      if (settings[j].close) $(button).addAttribute('data-close');

      buttons.push(button);
    }

    modalElement.querySelector('.modal-footer').append(...buttons);
    document.body.appendChild(modalElement);
    $(this[i]).modal(true);
    $(this[i].getAttribute('data-target')).fadeIn(ANIMATIONTIME);
  }
};
