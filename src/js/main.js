import './lib/lib';

$('div').addAttribute('data-add');
$('.class2').removeAttribute('data-add');
$('.class3').addAttribute(/*no parameters*/).hide();
$('.class4').toggleAttribute('data-add').addAttribute('data-add', 'add-info');

$('.link').addAttribute('target', '_blank').removeAttribute('target').addAttribute('target', '_blank');

$('button').on('click', function() {
  console.log($(this));
  $(this).toggleClass('active');
});