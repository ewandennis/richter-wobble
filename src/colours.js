import { random, round } from './maths';

export const mkAlternateColours = (colourA, colourB) => (idx) => idx % 2 ? colourA : colourB;
export const greyStripes = mkAlternateColours('#666', '#ccc');

const randomColourBase = 60;
export const randomColourChannel = () => round(randomColourBase + (random() * 128));

export const randomColour = () => ({
  r: randomColourChannel(),
  g: randomColourChannel(),
  b: randomColourChannel()
});

export const toCss = colour => typeof(colour) === 'string' ? colour : `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
