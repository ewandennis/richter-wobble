import { toCss } from './colours';

export const render = ({ curves, thickness, bgColour, colourFn, width, height, parentId }) => {
  // Create the canvas first time in
  const parent = document.getElementById(parentId);
  if (!parent.firstChild) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = width;
    newCanvas.height = height;
    parent.appendChild(newCanvas);
  }
  const canvas = parent.firstChild;
  const cxt = canvas.getContext('2d');
  
  // Fill background
  cxt.fillStyle = toCss(bgColour);
  cxt.fillRect(0, 0, width, height);

  // Stroke paths
  cxt.lineWidth = thickness;
  curves.forEach((curve, idx) => {
    cxt.strokeStyle = toCss(colourFn(idx));
    cxt.beginPath();
    cxt.moveTo(curve[0].x, curve[0].y);
    curve.forEach(pt => cxt.lineTo(pt.x, pt.y));
    cxt.stroke();
  });
};
