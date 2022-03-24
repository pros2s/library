import $ from '../core';


$.prototype.dropdownMenu = function() {
  for (let i = 0; i < this.length; i++) {
    const idItem = $(this[i]).attribute('id');

    $(this[i]).click(() => $(`[data-toggle-id=${idItem}]`).fadeToggle(200));
  }
};

$('.toggle-dropdown-menu').dropdownMenu();
