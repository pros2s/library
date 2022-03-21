import $ from '../core';


$.prototype.html = function(content) {
  for (let i = 0; i < this.length; i++){
    if (content) this[i].innerHTML = content
    else return this[i].innerHTML;
  }

  return this;
}

$.prototype.nodeNumber = function(number) {
  if (!this[number - 1]) throw new TypeError(`Element ${number} does not exist`);

  const tempNode = this[number - 1];
  for (let i in Object.keys(this)) delete this[i];

  this[0] = tempNode;
  this.length = 1;

  return this;
}