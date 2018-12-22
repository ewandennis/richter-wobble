import frame from './frame';
import { render as renderFn } from './canvas';

const fps = 30;
const frameDelta = (1 / fps) * 1000;
const parentId = 'gerhardt';

document.addEventListener('DOMContentLoaded', () => {
  let lastT = 0;
  const renderFrame = (t) => {
    window.requestAnimationFrame(renderFrame);
    // Limit to 
    if (t - lastT < frameDelta) {
      return;
    }
    lastT = t;
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    frame({ parentId, renderFn, width, height, t });
  };
  window.requestAnimationFrame(renderFrame);
});

window.addEventListener('error', (err) => {
  alert(`${err.filename} ${err.lineno}:${err.colno}: ${err.message}`);
});
