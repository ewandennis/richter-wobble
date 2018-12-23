import { arrayOf } from './array';
import { impulse, noise2D } from './maths';

export const segment1D = (a, b, resolution) => arrayOf(resolution+1).map(segmentIdx => a + ((segmentIdx/resolution) * (b-a)));
export const horizontalSegment = (p1, p2, resolution) => segment1D(p1.x, p2.x, resolution).map(x => ( { x, y: p1.y }));

export const buildPaths = (yValues, thickness, width, resolution) => yValues.map(y => horizontalSegment(
  { x: 0, y: y * thickness },
  { x: width, y: y * thickness },
  resolution
));

export const lineWidth = line => Math.abs(line[line.length-1].x - line[0].x);
export const lineHeight = line => Math.abs(line[line.length-1].y - line[0].y);

export const wigglePath = ({ path, startT, endT, rampSize, magnitude, scale, t }) => path.map((pt, idx) => {
  const pathT = idx / path.length;
  const tWiggle = impulse({t: pathT, rampUp: startT, rampDown: endT, rampSize });
  const perturbation = noise2D(pathT * scale, pt.y + t);
  return {
    x: pt.x,
    y: pt.y + perturbation * magnitude * tWiggle
  };
});

export const simplifyPaths = ({ paths, startY, endY }) => paths.map((path, idx) => {
  const t = idx / paths.length;
  if (t >= startY && t < endY) {
    return path;
  }
  return [path[0], path[path.length-1]];
});
