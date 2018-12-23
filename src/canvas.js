import { toCss } from './colours';

const DEBUG_SIZE = 4;

const makeCanvas = (width, height, parent) => {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = width;
  newCanvas.height = height;
  parent.appendChild(newCanvas);
  return newCanvas;
};

export const render = ({
  curves,
  thickness,
  bgColour,
  colourFn,
  width,
  height,
  debug,
  parentId
}) => {
  // Create the canvas first time in and when page dimensions change
  const parent = document.getElementById(parentId);
  let canvas = parent.firstChild;
  if (!canvas || canvas.width !== width || canvas.height !== height) {
    if (canvas) {
      canvas.remove();
    }
    canvas = makeCanvas(width, height, parent);
  }

  const cxt = canvas.getContext('2d');

  cxt.save();

  cxt.translate(0, thickness / 2);

  // Fill background
  cxt.fillStyle = toCss(bgColour);
  cxt.fillRect(0, 0, width, height);

  // Stroke paths
  cxt.lineWidth = thickness;
  curves.forEach((curve, idx) => {
    const t = idx / curves.length;
    cxt.beginPath();
    cxt.strokeStyle = toCss(colourFn({ idx, t }));
    cxt.moveTo(curve[0].x, curve[0].y);
    curve.forEach(pt => cxt.lineTo(pt.x, pt.y));
    cxt.stroke();
  });

  if (debug) {
    cxt.fillStyle = '#0f0';
    curves.forEach(curve =>
      curve.forEach(pt =>
        cxt.fillRect(
          pt.x - DEBUG_SIZE,
          pt.y - DEBUG_SIZE,
          DEBUG_SIZE,
          DEBUG_SIZE
        )
      )
    );
  }

  cxt.restore();

  return canvas;
};
