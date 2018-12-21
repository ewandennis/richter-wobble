import { Color } from 'svg.js';
import { arrayOf } from './array';
import { horizontalSegment } from './path';

const random = () => Math.round(Math.random() * 255);
const randomColour = () => new Color({ r: random(), g: random(), b: random() });
const round = Math.round;

//

const buildLines = (yValues, thickness, width, svg) =>
  yValues.map(y => svg.line(0, y * thickness, width, y * thickness));

//

const pathFromLine = (p1, p2, resolution) => {
  const [_, ...rest] = horizontalSegment(p1, p2, resolution);
  return [
    `M ${p1.x} ${p1.y}`,
    ...rest.map(pt => `L ${round(pt.x)} ${round(pt.y)}`),
    `L ${p2.x} ${p2.y}`
  ].join(' ');
};

const buildPaths = (yValues, thickness, width, svg, resolution) =>
  yValues.map(y => svg.path(pathFromLine(
      { x: 0, y: y * thickness },
      { x: width, y: y * thickness },
      resolution
    )));

const stroke = (array, thickness) => array.map(item => item.stroke({
  width: thickness,
  color: randomColour().toHex()
}));

export default ({ svg, width, height }) => {
  const thickness = 10;
  const lineCount = Math.floor(height / thickness);
  const resolution = width / 2;

  const yValues = arrayOf(lineCount);

  // horizontally stacked random coloured lines
  // stroke(buildLines(yValues, thickness, width, svg), thickness);

  // lines -> paths
  stroke(buildPaths(yValues, thickness, width, svg, resolution), thickness);

  // // move paths yStart - yEnd
};
