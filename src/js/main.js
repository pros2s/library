import './lib/lib';

$('#modalTrigger').click(() => $('#modalTrigger').createModal(
  {
    inner: {
      title: 'First Modal',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore impedit nobis voluptatem ea veritatis numquam at molestiae ex rem dolor quam perspiciatis quidem assumenda, vero provident quasi quis voluptatum magni. Harum a'
    },
    btns: {
      count: 3,
      settings: [
        {
          classes: ['btn-danger', 'mr-10'],
          content: 'close',
          close: true
        },
        {
          classes: ['btn-success', 'mr-10'],
          content: 'save',
          callback: () => alert('Saved')
        },
        {
          classes: ['btn-warning'],
          content: 'warning',
          callback: () => {
            alert('warning');
            console.log('warning');
          }
        }
      ]
    }
  }
));


$('#modalTrigger2').click(() => $('#modalTrigger2').createModal(
  {
    inner: {
      title: 'Second Modal',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore impedit nobis voluptatem ea veritatis numquam at molestiae ex rem dolor quam perspiciatis quidem assumenda, vero provident quasi quis voluptatum magni. Harum rem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore impedit nobis voluptatem ea veritatis numquam at molestiae ex rem dolor quam perspiciatis quidem assumenda, vero provident quasi quis voluptatum magni. Harum aa'
    },
    btns: {
      count: 2,
      settings: [
        {
          classes: ['btn-danger', 'mr-10'],
          content: 'close',
          close: true
        },
        {
          classes: ['btn-dark', 'mr-10'],
          content: 'dark-mode',
          callback: () => {
            $('.btn-dark').on('click', () => {
              $('.modal-content').addClass('modal-dark');
              $('.modal-header').addClass('color-white');
              $('.modal-body').addClass('color-white');
              $('.modal-content .close').addClass('color-white');
            });
          }
        }
      ]
    }
  }
));

$('.accordion__trigger').accordion('accordion__trigger--active', 'accordion__content--active');
