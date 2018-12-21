import { Color } from 'svg.js';
import { randomBytes } from 'crypto';

const random = () => Math.round(Math.random() * 255);
const randomColour = () => new Color({ r: random(), g: random(), b: random() });

export default ({ svg, width, height }) => {
  const thickness = 3;
  const lineCount = Math.floor(height / thickness);

  // horizontally stacked random coloured lines
  const yValues = Array.from(Array(lineCount).keys());

  yValues.forEach(y => svg.line(0, y * thickness, width, y * thickness).stroke({
    width: thickness,
    color: randomColour().toHex()
  }));
  
  // // lines -> paths
  // // move paths yStart - yEnd
  
};
