import SimplexNoise from 'simplex-noise';

// From simplex-noise
export const aleaRandom = () => {
  // Johannes Baagøe <baagoe@baagoe.com>, 2010
  var s0 = 0;
  var s1 = 0;
  var s2 = 0;
  var c = 1;

  var mash = masher();
  s0 = mash(' ');
  s1 = mash(' ');
  s2 = mash(' ');

  for (var i = 0; i < arguments.length; i++) {
    s0 -= mash(arguments[i]);
    if (s0 < 0) {
      s0 += 1;
    }
    s1 -= mash(arguments[i]);
    if (s1 < 0) {
      s1 += 1;
    }
    s2 -= mash(arguments[i]);
    if (s2 < 0) {
      s2 += 1;
    }
  }
  mash = null;
  return function() {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  };
}

function masher() {
  var n = 0xefc8249d;
  return function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
}

const randomSeed = 101;
export const random = aleaRandom(randomSeed);
export const round = Math.round;

export const makeRandom = aleaRandom;

const simplexNoise = new SimplexNoise(random);
export const noise2D = simplexNoise.noise2D.bind(simplexNoise);

export const step = (x, thresh) => x >= thresh ? 1 : 0;

export const smoothstep = (x, lo, hi) => {
  const xClamped = clamp(x, lo, hi);
  return xClamped * xClamped * (3 - 2 * xClamped);
}

export const clamp = (x, lo, hi) => x < lo ? lo : (x > hi ? hi : x);

//        ______
//       /      \
// _____/        \_____
// |   |  |   |  |    |
// 0   t0 t1  t2 t3   1
//
export const impulse = ({t, rampUp, rampDown, rampSize}) => {
  if (t < rampUp || t >= rampDown + rampSize) {
    return 0;
  }
  if (t < rampUp + rampSize) {
    return smoothstep((t-rampUp)/rampSize, 0, 1);
  }
  if (t < rampDown) {
    return 1;
  }
  //f t >= rampDown
  return 1 - smoothstep((t-rampDown)/rampSize, 0, 1);
};