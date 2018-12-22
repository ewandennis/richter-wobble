import { arrayOf } from './array';
import { buildPaths, wigglePath } from './path';
import { render } from './svg';
import { round } from './maths';
import { randomColour, greyStripes } from './colours';

export default ({ parentSelector, width, height, t }) => {
  const lineCount = 80;
  const thickness = Math.ceil(height / lineCount);
  const resolution = round(width / 8);
  const startWiggleX = 0.6;
  const startWiggleY = 0.4;
  const endWiggleY = 0.6;
  const wiggleMagnitude = 150;
  const wiggleScale = 0.75;
  const wiggleSpeedDivisor = 5000;
  const bgColour = { r: 20, g: 80, b: 160 };

  const yValues = arrayOf(lineCount);

  // lines -> paths
  const paths = buildPaths(yValues, thickness, width, resolution);
  
  // move paths yStart - yEnd
  const wiggly = paths.map((path, idx) => {
    const y = idx/paths.length;
    return y >= startWiggleY && y < endWiggleY
      ? wigglePath({ path, startT: startWiggleX, magnitude: wiggleMagnitude, scale: wiggleScale, t: t/wiggleSpeedDivisor })
      : path;
  });

  return render({ curves: wiggly, thickness, bgColour, colourFn: greyStripes, width, height, parentSelector });
};
