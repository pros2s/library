export default (slidesField, offset, dots, slideIndex) => {
  slidesField.style.transform = `translateX(-${offset}px)`;
  dots.forEach((dot) => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
};
