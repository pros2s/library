export default () => {
  let div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';

  document.body.append(div);
  const scrWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrWidth;
};
