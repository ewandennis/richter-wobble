import { arrayOf } from "./array";
import { buildPaths, wigglePath, simplifyPaths } from "./path";
import { round } from "./maths";
import { mkSweep } from "./colours";


export default ({ parentId, renderFn, width, height, t }) => {
  const lineCount = 30;
  const thickness = Math.ceil(height / lineCount);
  const resolution = round(width / 12);
  const rampSize = 0.1;
  const startWiggleX = 0.3;
  const endWiggleX = 0.6;
  const startWiggleY = 0.3;
  const endWiggleY = 0.6;
  const wiggleMagnitude = 50;
  const wiggleScale = 5;
  const wiggleSpeedDivisor = 5000;
  const bgColour = { r: 160, g: 100, b: 180 };
  const colourScheme = mkSweep({ r: 5, g: 54, b: 134 }, { r: 130, g: 210, b: 245 });
  
  // Heights for each line
  const yValues = arrayOf(lineCount);

  // A straight, horizontal path at each height from screen left to right
  const paths = buildPaths(yValues, thickness, width, resolution);

  // Wiggle the paths between startWiggleT and endWiggleY
  const wiggly = paths.map((path, idx) => {
    const y = idx / paths.length;
    return y >= startWiggleY && y < endWiggleY
      ? wigglePath({
          path,
          startT: startWiggleX,
          endT: endWiggleX,
          rampSize,
          magnitude: wiggleMagnitude,
          scale: wiggleScale,
          t: t / wiggleSpeedDivisor
        })
      : path;
  });

  const curves = simplifyPaths({ paths: wiggly, startY: startWiggleY, endY: endWiggleY });

  renderFn({
    curves,
    thickness,
    bgColour,
    colourFn: colourScheme,
    width,
    height,
    parentId
  });
};
