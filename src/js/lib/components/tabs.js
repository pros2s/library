import $ from '../core';


$.prototype.tabs = function() {
  for (let i = 0; i < this.length; i++) {
    $(this[i]).click(() => {
      $(this[i])
        .addClass('tabs__trigger--active')
        .siblings()
        .removeClass('tabs__trigger--active')
        .closest('.tabs')
        .findAll('.tabs__inner')
        .addAttribute('style', '')
        .nodeNumber($(this[i]).nodeIndex() + 1)
        .fadeIn(700);
    });
  }
};

$('[data-tabpanel] .tabs__trigger').tabs();
