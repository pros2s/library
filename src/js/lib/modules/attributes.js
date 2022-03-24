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

$.prototype.attribute = function(attributeName) {
  if (!attributeName) return this;

  for (let i = 0; i < this.length; i++) {
    if (!this[i].getAttribute(attributeName)) return this;

    return this[i].getAttribute(attributeName);
  }
};
