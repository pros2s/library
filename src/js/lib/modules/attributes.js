import $ from '../core';


$.prototype.addAttribute = function(attributeName, attributeValue = '') {
  if (!attributeName) return this;

  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(attributeName, attributeValue);
  }

  return this;
};

$.prototype.removeAttribute = function(attributeName) {
  if (!attributeName) return this;

  for (let i = 0; i < this.length; i++) {
    this[i].removeAttribute(attributeName);
  }

  return this;
};

$.prototype.toggleAttribute = function(attributeName) {
  if (!attributeName) return this;

  for (let i = 0; i < this.length; i++) {
    this[i].toggleAttribute(attributeName);
  }

  return this;
};
