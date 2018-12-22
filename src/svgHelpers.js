import { round } from './maths';

export const toPathString = ([first, ...rest]) => [
  `M ${first.x} ${first.y}`,
  ...rest.map(pt => `L ${round(pt.x)} ${round(pt.y)}`)
].join(' ');

export const toSvgPath = (path, svg) => svg.path(toPathString(path));

export const stroke = (array, thickness, colourFn) => array.map((item, idx) => item.stroke({
  width: thickness,
  color: colourFn(idx).toHex()
}));
