import { Color } from 'svg.js';
import { round } from './maths';

const background = (svg, width, height, colour) => svg.rect(width, height).fill(new Color(colour).toHex());

export const toPathString = ([first, ...rest]) => [
  `M ${first.x} ${first.y}`,
  ...rest.map(pt => `L ${round(pt.x)} ${round(pt.y)}`)
].join(' ');

export const toSvgPath = (path, svg) => svg.path(toPathString(path));

export const stroke = (array, thickness, colourFn) => array.map((item, idx) => item.stroke({
  width: thickness,
  color: colourFn(idx).toHex()
}));

let svg;
export const render = ({ curves, thickness, bgColour, colourFn, width, height, parentSelector }) => {
  if (svg) {
    svg.remove();
  }

  svg = SVG(parentSelector).size('100%', '100%');

  background(svg, width, height, bgColour);

  // Shift the world down a little to push the top line fully into view
  const canvas = svg.group().transform({ y: -0.5 * thickness });

  const svgPaths = curves.map(path => toSvgPath(path, canvas));
  stroke(svgPaths, thickness, colourFn);

  return canvas;
};
