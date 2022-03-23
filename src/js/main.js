import './lib/lib';

$('#first').click(() => {
  $('#first-text').fadeOut(1500);
});

$('[data-count="second"]').click(() => {
  $('#second-text').fadeOut(1500);
});

$('#both').click(() => {
  $('.text').fadeOut(1500);
});
