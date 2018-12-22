import frame from './frame';
import { render as svgRender } from './svg';
import { render as canvasRender } from './canvas';

document.addEventListener('DOMContentLoaded', () => {
  const parentId = 'gerhardt';
  const renderFn = canvasRender;
  const renderFrame = (t) => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    frame({ parentId, renderFn, width, height, t });
    window.requestAnimationFrame(renderFrame);
  };
  window.requestAnimationFrame(renderFrame);
});
