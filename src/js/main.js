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
