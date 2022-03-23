import './lib/lib';

$('#first').click(() => {
  $('#first-text').fadeToggle(1500);
});

$('[data-count="second"]').click(() => {
  $('#second-text').fadeToggle(1500);
});

$('#both').click(() => {
  $('.text').fadeToggle(1500);
});
