import { Color } from 'svg.js';
import { arrayOf } from './array';
import { buildPaths, wigglePath } from './path';
import { toSvgPath, stroke } from './svgHelpers';
import { round } from './maths';

const background = (svg, width, height, colour) => svg.rect(width, height).fill(colour.toHex());

export default ({ svg, width, height }) => {
  const lineCount = 40;
  const thickness = round(height / lineCount);
  const resolution = round(width / 2);
  const startWiggleX = 0.6;
  const startWiggleY = 0.4;
  const endWiggleY = 0.7;
  const wiggleMagnitude = 200;
  const wiggleScale = 0.75;
  const bgColour = new Color({ r: 20, g: 120, b: 220 });

  background(svg, width, height, bgColour);

  // Shift the world down a little to push the top line fully into view
  const canvas = svg.group().transform({ y: -0.5 * thickness });

  const yValues = arrayOf(lineCount);

  // lines -> paths
  const paths = buildPaths(yValues, thickness, width, resolution);
  
  // move paths yStart - yEnd
  const wiggly = paths.map((path, idx) => {
    const y = idx/paths.length;
    return y >= startWiggleY && y < endWiggleY
      ? wigglePath({ path, startT: startWiggleX, magnitude: wiggleMagnitude, scale: wiggleScale })
      : path;
  });

  const svgPaths = wiggly.map(path => toSvgPath(path, canvas));
  stroke(svgPaths, thickness);
};
