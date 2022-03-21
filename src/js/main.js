import './lib/lib';


$('button').on('click', function() {
  console.log($(this));
  $(this).toggleClass('active');
});