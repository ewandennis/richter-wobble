// SVG.js
import SVG from 'svg.js';
import App from './app';

SVG.on(document, 'DOMContentLoaded', () => {
  const width = '100%';
  const height = '100%';
  const svg = SVG('gerhardt').size(width, height);
  const parent = document.getElementById('gerhardt');
  const t1 = new Date();
  App({ svg, width: parent.clientWidth, height: parent.clientHeight });
  const t2 = new Date();
  console.log(`Runtime: ${(t2 - t1) / 1000}sec`);
});
