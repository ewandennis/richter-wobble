import render from './frame';

document.addEventListener('DOMContentLoaded', () => {
  const parentSelector = 'gerhardt';
  const renderFrame = (t) => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    render({ parentSelector, width, height, t });
    window.requestAnimationFrame(renderFrame);
  };
  window.requestAnimationFrame(renderFrame);
});
