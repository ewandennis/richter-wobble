import { Color } from 'svg.js';
import { random, round } from './maths';

export const mkAlternateColours = (colourA, colourB) => (idx) => idx % 2 ? colourA : colourB;
export const greyStripes = mkAlternateColours(new Color('#666'), new Color('#ccc'));

const randomColourBase = 60;
export const randomColourChannel = () => round(randomColourBase + (random() * 128));

export const randomColour = () => new Color({
  r: randomColourChannel(),
  g: randomColourChannel(),
  b: randomColourChannel()
});
