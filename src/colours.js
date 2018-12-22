import { makeRandom, round } from './maths';

export const mkAlternateColours = (colourA, colourB) => (idx) => idx % 2 ? colourA : colourB;
export const greyStripes = mkAlternateColours('#666', '#ccc');

const randomColourBase = 60;
export const randomColourChannel = (rng) => round(randomColourBase + (rng() * 128));

export const randomColour = (rng = makeRandom(109)) => ({
  r: randomColourChannel(rng),
  g: randomColourChannel(rng),
  b: randomColourChannel(rng)
});

export const toCss = colour => typeof(colour) === 'string' ? colour : `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
