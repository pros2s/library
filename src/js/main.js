import './lib/lib';

console.log($('.class2').html('<div><p>another element p in div</p></div>').html());

$('button').click(() => {
  $('div').nodeNumber(2).toggleClass('active');
})