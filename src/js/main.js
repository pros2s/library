import './lib/lib';


$('div').click(sayMyName);
$('.class1').off('click', sayMyName);

function sayMyName() {
  console.log(`My name is ${this.className}`);
};