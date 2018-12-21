import { Color } from 'svg.js';
import { random, round } from './maths';

const randomColourBase = 80;
export const randomColourChannel = () => round(randomColourBase + (random() * 128));

export const randomColour = () => new Color({
  r: randomColourChannel(),
  g: randomColourChannel(),
  b: randomColourChannel()
});

export const toPathString = ([first, ...rest]) => [
  `M ${first.x} ${first.y}`,
  ...rest.map(pt => `L ${round(pt.x)} ${round(pt.y)}`)
].join(' ');

export const toSvgPath = (path, svg) => svg.path(toPathString(path));

export const stroke = (array, thickness) => array.map(item => item.stroke({
  width: thickness,
  color: randomColour().toHex()
}));
