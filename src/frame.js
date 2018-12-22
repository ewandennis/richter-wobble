import { arrayOf } from './array';
import { buildPaths, wigglePath } from './path';
import { round } from './maths';
import { randomColour, greyStripes } from './colours';

export default ({ parentId, renderFn, width, height, t }) => {
  const lineCount = 80;
  const thickness = Math.ceil(height / lineCount);
  const resolution = round(width / 16);
  const startWiggleX = 0.6;
  const startWiggleY = 0.4;
  const endWiggleY = 0.6;
  const wiggleMagnitude = 150;
  const wiggleScale = 0.75;
  const wiggleSpeedDivisor = 5000;
  const bgColour = { r: 20, g: 80, b: 160 };
  const colourScheme = greyStripes;

  // Heights for each line
  const yValues = arrayOf(lineCount);

  // A straight, horizontal path at each height from screen left to right
  const paths = buildPaths(yValues, thickness, width, resolution);
  
  // Wiggle the paths between startWiggleT and endWiggleY
  const wiggly = paths.map((path, idx) => {
    const y = idx/paths.length;
    return y >= startWiggleY && y < endWiggleY
      ? wigglePath({ path, startT: startWiggleX, magnitude: wiggleMagnitude, scale: wiggleScale, t: t/wiggleSpeedDivisor })
      : path;
  });

  renderFn({ curves: wiggly, thickness, bgColour, colourFn: colourScheme, width, height, parentId });
};
