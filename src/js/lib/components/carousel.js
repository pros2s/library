import slideInteractive from '../../helpers/slideInteractive';
import $ from '../core';


$.prototype.carousel = function() {
  for (let i = 0; i < this.length; i++) {
    const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width;
    const slides = this[i].querySelectorAll('.carousel-item');
    const slidesField = this[i].querySelector('.carousel-slides');
    const dots = this[i].querySelectorAll('.carousel-indicators li');

    slidesField.style.width = 100 * slides.length + '%';

    slides.forEach((slide) => slide.style.width = width);

    let offset = 0;
    let slideIndex = 0;

    // next arrow(right)
    $(this[i].querySelector('[data-slide="next"]')).click((e) => {
      e.preventDefault();

      offset === +width.replace(/\D/g, '') * (slides.length - 1) ?
        offset = 0 :
        offset += +width.replace(/\D/g, '');

      slideIndex === slides.length - 1 ?
        slideIndex = 0 :
        slideIndex++;

      slideInteractive(slidesField, offset, dots, slideIndex);
    });


    // prev arrow(left)
    $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
      e.preventDefault();

      offset === 0 ?
        offset = +width.replace(/\D/g, '') * (slides.length - 1) :
        offset -= +width.replace(/\D/g, '');

      slideIndex === 0 ?
        slideIndex = slides.length - 1 :
        slideIndex--;

      slideInteractive(slidesField, offset, dots, slideIndex);
    });


    // slide dots at the bottom
    $('#example ol li').click((e) => {
      const slideWay = +$(e.target).attribute('data-slide-to');

      slideIndex = slideWay;
      offset = +width.replace(/\D/g, '') * slideWay;

      slideInteractive(slidesField, offset, dots, slideIndex);
    });
  }
};

$('#example').carousel();
