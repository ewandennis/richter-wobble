import { makeRandom, round, lerp } from './maths';

export const mkAlternateColours = (colourA, colourB) => ({ idx }) => idx % 2 ? colourA : colourB;
export const greyStripes = mkAlternateColours('#666', '#ccc');

const randomColourBase = 60;
export const randomColourChannel = (rng) => round(randomColourBase + (rng() * 128));

export const randomColour = (rng = makeRandom(109)) => ({
  r: randomColourChannel(rng),
  g: randomColourChannel(rng),
  b: randomColourChannel(rng)
});

export const lerpColour = (a, b, t) => ({
  r: lerp(a.r, b.r, t),
  g: lerp(a.g, b.g, t),
  b: lerp(a.b, b.b, t)
});

export const mkSweep = (colourA, colourB) => ({ t }) => lerpColour(fromCss(colourA), fromCss(colourB), t)
export const greySweep = mkSweep('#222', '#aaa');

export const toCss = colour => typeof(colour) === 'string' ? colour : `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
export const interpretCssChannel = (channelStr) => channelStr.length === 1 ? channelStr+channelStr : channelStr;
export const fromCss = colour => {
  if (typeof(colour) !== 'string') {
    return colour;
  }
  const matches = /^\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*$/.exec(colour);
  if (!matches) {
    throw new Error(`Could not parse colour string`);
  }
  const rgb = {
    r: parseInt(interpretCssChannel(matches[1]), 16),
    g: parseInt(interpretCssChannel(matches[2]), 16),
    b: parseInt(interpretCssChannel(matches[3]), 16)
  };
  return rgb;
};