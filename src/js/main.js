import './lib/lib';

console.log($('.find').findAll('.find__item').addClass('found'));
console.log($('.find').findAll('.find__not').addClass('found-either'));
console.log($('.find').findAll('#find'));//#find doesn't exist