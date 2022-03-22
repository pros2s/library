import $ from '../core';


$.prototype.html = function(content) {
  for (let i = 0; i < this.length; i++){
    if (content) this[i].innerHTML = content
    else return this[i].innerHTML;
  }

  return this;
};

$.prototype.nodeNumber = function(number) {
  if (!this[number - 1]) throw new TypeError(`Element ${number} does not exist`);

  const tempNode = this[number - 1];
  for (let i in Object.keys(this)) delete this[i];

  this[0] = tempNode;
  this.length = 1;

  return this;
};

$.prototype.nodeIndex = function() {
  const parent = this[0].parentNode;
  const allChildren = [...parent.children];

  const findThis = (item) => item === this[0];

  return allChildren.findIndex(findThis);
};

$.prototype.findAll = function(selector) {
  let elementsCounter = 0;
  let counter = 0;

  const copyThis = Object.assign({}, this);

  for (let i = 0; i < copyThis.length; i++) {
    const arrayOfElements = copyThis[i].querySelectorAll(selector);
    if (arrayOfElements.length === 0) continue;

    for (let j = 0; j < arrayOfElements.length; j++) {
      this[counter] = arrayOfElements[j];
      counter++;
    }

    elementsCounter += arrayOfElements.length;
  }

  this.length = elementsCounter;

  const objLength = Object.keys(this).length;
  for (; elementsCounter < objLength; elementsCounter++) delete this[elementsCounter];

  return this;
};

$.prototype.closest = function(selector) {
  let counter = 0;

  for (let i = 0; i < this.length; i++) {
    const currentThis = this[i];
    this[i] = this[i].closest(selector);

    if (!this[i]) this[i] = currentThis;
    counter++;
  }

  const objLength = Object.keys(this).length;
  for (; counter < objLength; counter++) delete this[counter];

  return this;
};

$.prototype.siblings = function() {
  let counterChildren = 0;
  let counterSiblings = 0;

  const copyThis = Object.assign({}, this);

  for (let i = 0; i < copyThis.length; i++) {
    const thisParentChildren = copyThis[i].parentNode.children;

    for (let j = 0; j < thisParentChildren.length; j++) {
      if (copyThis[i] === thisParentChildren[j]) continue;

      this[counterChildren] = thisParentChildren[j];
      counterChildren++;
    }

    counterSiblings += thisParentChildren.length - 1;
  }

  this.length = counterSiblings;

  const objLength = Object.keys(this).length;
  for (; counterSiblings < objLength; counterSiblings++) delete this[counterSiblings];
  return this;
};