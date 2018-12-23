/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/simplex-noise/simplex-noise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplex-noise/simplex-noise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.


 Copyright (c) 2018 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function() {
  'use strict';

  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  var F3 = 1.0 / 3.0;
  var G3 = 1.0 / 6.0;
  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

  function SimplexNoise(randomOrSeed) {
    var random;
    if (typeof randomOrSeed == 'function') {
      random = randomOrSeed;
    }
    else if (randomOrSeed) {
      random = alea(randomOrSeed);
    } else {
      random = Math.random;
    }
    this.p = buildPermutationTable(random);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (var i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }

  }
  SimplexNoise.prototype = {
    grad3: new Float32Array([1, 1, 0,
      -1, 1, 0,
      1, -1, 0,

      -1, -1, 0,
      1, 0, 1,
      -1, 0, 1,

      1, 0, -1,
      -1, 0, -1,
      0, 1, 1,

      0, -1, 1,
      0, 1, -1,
      0, -1, -1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
    noise2D: function(xin, yin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0 = 0; // Noise contributions from the three corners
      var n1 = 0;
      var n2 = 0;
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin) * F2; // Hairy factor for 2D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var X0 = i - t; // Unskew the cell origin back to (x,y) space
      var Y0 = j - t;
      var x0 = xin - X0; // The x,y distances from the cell origin
      var y0 = yin - Y0;
      // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.
      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      else {
        i1 = 0;
        j1 = 1;
      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6
      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
      var y2 = y0 - 1.0 + 2.0 * G2;
      // Work out the hashed gradient indices of the three simplex corners
      var ii = i & 255;
      var jj = j & 255;
      // Calculate the contribution from the three corners
      var t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 >= 0) {
        var gi0 = permMod12[ii + perm[jj]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
      }
      var t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 >= 0) {
        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
      }
      var t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 >= 0) {
        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 70.0 * (n0 + n1 + n2);
    },
    // 3D simplex noise
    noise3D: function(xin, yin, zin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0, n1, n2, n3; // Noise contributions from the four corners
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var k = Math.floor(zin + s);
      var t = (i + j + k) * G3;
      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
      var Y0 = j - t;
      var Z0 = k - t;
      var x0 = xin - X0; // The x,y,z distances from the cell origin
      var y0 = yin - Y0;
      var z0 = zin - Z0;
      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
      // Determine which simplex we are in.
      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // X Y Z order
        else if (x0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // X Z Y order
        else {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // Z X Y order
      }
      else { // x0<y0
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Z Y X order
        else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Y Z X order
        else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // Y X Z order
      }
      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
      // c = 1/6.
      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
      var y1 = y0 - j1 + G3;
      var z1 = z0 - k1 + G3;
      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
      var y2 = y0 - j2 + 2.0 * G3;
      var z2 = z0 - k2 + 2.0 * G3;
      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
      var y3 = y0 - 1.0 + 3.0 * G3;
      var z3 = z0 - 1.0 + 3.0 * G3;
      // Work out the hashed gradient indices of the four simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      // Calculate the contribution from the four corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
        t3 *= t3;
        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to stay just inside [-1,1]
      return 32.0 * (n0 + n1 + n2 + n3);
    },
    // 4D simplex noise, better simplex rank ordering method 2012-03-09
    noise4D: function(x, y, z, w) {
      var perm = this.perm;
      var grad4 = this.grad4;

      var n0, n1, n2, n3, n4; // Noise contributions from the five corners
      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
      var s = (x + y + z + w) * F4; // Factor for 4D skewing
      var i = Math.floor(x + s);
      var j = Math.floor(y + s);
      var k = Math.floor(z + s);
      var l = Math.floor(w + s);
      var t = (i + j + k + l) * G4; // Factor for 4D unskewing
      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
      var Y0 = j - t;
      var Z0 = k - t;
      var W0 = l - t;
      var x0 = x - X0; // The x,y,z,w distances from the cell origin
      var y0 = y - Y0;
      var z0 = z - Z0;
      var w0 = w - W0;
      // For the 4D case, the simplex is a 4D shape I won't even try to describe.
      // To find out which of the 24 possible simplices we're in, we need to
      // determine the magnitude ordering of x0, y0, z0 and w0.
      // Six pair-wise comparisons are performed between each possible pair
      // of the four coordinates, and the results are used to rank the numbers.
      var rankx = 0;
      var ranky = 0;
      var rankz = 0;
      var rankw = 0;
      if (x0 > y0) rankx++;
      else ranky++;
      if (x0 > z0) rankx++;
      else rankz++;
      if (x0 > w0) rankx++;
      else rankw++;
      if (y0 > z0) ranky++;
      else rankz++;
      if (y0 > w0) ranky++;
      else rankw++;
      if (z0 > w0) rankz++;
      else rankw++;
      var i1, j1, k1, l1; // The integer offsets for the second simplex corner
      var i2, j2, k2, l2; // The integer offsets for the third simplex corner
      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
      // impossible. Only the 24 indices which have non-zero entries make any sense.
      // We use a thresholding to set the coordinates in turn from the largest magnitude.
      // Rank 3 denotes the largest coordinate.
      i1 = rankx >= 3 ? 1 : 0;
      j1 = ranky >= 3 ? 1 : 0;
      k1 = rankz >= 3 ? 1 : 0;
      l1 = rankw >= 3 ? 1 : 0;
      // Rank 2 denotes the second largest coordinate.
      i2 = rankx >= 2 ? 1 : 0;
      j2 = ranky >= 2 ? 1 : 0;
      k2 = rankz >= 2 ? 1 : 0;
      l2 = rankw >= 2 ? 1 : 0;
      // Rank 1 denotes the second smallest coordinate.
      i3 = rankx >= 1 ? 1 : 0;
      j3 = ranky >= 1 ? 1 : 0;
      k3 = rankz >= 1 ? 1 : 0;
      l3 = rankw >= 1 ? 1 : 0;
      // The fifth corner has all coordinate offsets = 1, so no need to compute that.
      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
      var y1 = y0 - j1 + G4;
      var z1 = z0 - k1 + G4;
      var w1 = w0 - l1 + G4;
      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
      var y2 = y0 - j2 + 2.0 * G4;
      var z2 = z0 - k2 + 2.0 * G4;
      var w2 = w0 - l2 + 2.0 * G4;
      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
      var y3 = y0 - j3 + 3.0 * G4;
      var z3 = z0 - k3 + 3.0 * G4;
      var w3 = w0 - l3 + 3.0 * G4;
      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
      var y4 = y0 - 1.0 + 4.0 * G4;
      var z4 = z0 - 1.0 + 4.0 * G4;
      var w4 = w0 - 1.0 + 4.0 * G4;
      // Work out the hashed gradient indices of the five simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      var ll = l & 255;
      // Calculate the contribution from the five corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
        t0 *= t0;
        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
        t1 *= t1;
        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
        t2 *= t2;
        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
        t3 *= t3;
        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
      }
      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
      if (t4 < 0) n4 = 0.0;
      else {
        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
        t4 *= t4;
        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
      }
      // Sum up and scale the result to cover the range [-1,1]
      return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
  };

  function buildPermutationTable(random) {
    var i;
    var p = new Uint8Array(256);
    for (i = 0; i < 256; i++) {
      p[i] = i;
    }
    for (i = 0; i < 255; i++) {
      var r = i + ~~(random() * (256 - i));
      var aux = p[i];
      p[i] = p[r];
      p[r] = aux;
    }
    return p;
  }
  SimplexNoise._buildPermutationTable = buildPermutationTable;

  function alea() {
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

  // amd
  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return SimplexNoise;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  // common js
  if (true) exports.SimplexNoise = SimplexNoise;
  // browser
  else {}
  // nodejs
  if (true) {
    module.exports = SimplexNoise;
  }

})();


/***/ }),

/***/ "./src/array.js":
/*!**********************!*\
  !*** ./src/array.js ***!
  \**********************/
/*! exports provided: arrayOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayOf", function() { return arrayOf; });
var arrayOf = function arrayOf(n) {
  return Array.from(Array(n).keys());
};

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _colours__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colours */ "./src/colours.js");

var DEBUG_SIZE = 4;

var makeCanvas = function makeCanvas(width, height, parent) {
  var newCanvas = document.createElement('canvas');
  newCanvas.width = width;
  newCanvas.height = height;
  parent.appendChild(newCanvas);
  return newCanvas;
};

var render = function render(_ref) {
  var curves = _ref.curves,
      thickness = _ref.thickness,
      bgColour = _ref.bgColour,
      colourFn = _ref.colourFn,
      width = _ref.width,
      height = _ref.height,
      debug = _ref.debug,
      parentId = _ref.parentId;
  // Create the canvas first time in and when page dimensions change
  var parent = document.getElementById(parentId);
  var canvas = parent.firstChild;

  if (!canvas || canvas.width !== width || canvas.height !== height) {
    if (canvas) {
      canvas.remove();
    }

    canvas = makeCanvas(width, height, parent);
  }

  var cxt = canvas.getContext('2d');
  cxt.save();
  cxt.translate(0, thickness / 2); // Fill background

  cxt.fillStyle = Object(_colours__WEBPACK_IMPORTED_MODULE_0__["toCss"])(bgColour);
  cxt.fillRect(0, 0, width, height); // Stroke paths

  cxt.lineWidth = thickness;
  curves.forEach(function (curve, idx) {
    var t = idx / curves.length;
    cxt.beginPath();
    cxt.strokeStyle = Object(_colours__WEBPACK_IMPORTED_MODULE_0__["toCss"])(colourFn({
      idx: idx,
      t: t
    }));
    cxt.moveTo(curve[0].x, curve[0].y);
    curve.forEach(function (pt) {
      return cxt.lineTo(pt.x, pt.y);
    });
    cxt.stroke();
  });

  if (debug) {
    cxt.fillStyle = '#0f0';
    curves.forEach(function (curve) {
      return curve.forEach(function (pt) {
        return cxt.fillRect(pt.x - DEBUG_SIZE, pt.y - DEBUG_SIZE, DEBUG_SIZE, DEBUG_SIZE);
      });
    });
  }

  cxt.restore();
};

/***/ }),

/***/ "./src/colours.js":
/*!************************!*\
  !*** ./src/colours.js ***!
  \************************/
/*! exports provided: mkAlternateColours, greyStripes, randomColourChannel, randomColour, lerpColour, mkSweep, greySweep, toCss, interpretCssChannel, fromCss */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mkAlternateColours", function() { return mkAlternateColours; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greyStripes", function() { return greyStripes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomColourChannel", function() { return randomColourChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomColour", function() { return randomColour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerpColour", function() { return lerpColour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mkSweep", function() { return mkSweep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greySweep", function() { return greySweep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCss", function() { return toCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpretCssChannel", function() { return interpretCssChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCss", function() { return fromCss; });
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maths */ "./src/maths.js");

var mkAlternateColours = function mkAlternateColours(colourA, colourB) {
  return function (_ref) {
    var idx = _ref.idx;
    return idx % 2 ? colourA : colourB;
  };
};
var greyStripes = mkAlternateColours('#666', '#ccc');
var randomColourBase = 60;
var randomColourChannel = function randomColourChannel(rng) {
  return Object(_maths__WEBPACK_IMPORTED_MODULE_0__["round"])(randomColourBase + rng() * 128);
};
var randomColour = function randomColour() {
  var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(_maths__WEBPACK_IMPORTED_MODULE_0__["makeRandom"])(109);
  return {
    r: randomColourChannel(rng),
    g: randomColourChannel(rng),
    b: randomColourChannel(rng)
  };
};
var lerpColour = function lerpColour(a, b, t) {
  return {
    r: Object(_maths__WEBPACK_IMPORTED_MODULE_0__["lerp"])(a.r, b.r, t),
    g: Object(_maths__WEBPACK_IMPORTED_MODULE_0__["lerp"])(a.g, b.g, t),
    b: Object(_maths__WEBPACK_IMPORTED_MODULE_0__["lerp"])(a.b, b.b, t)
  };
};
var mkSweep = function mkSweep(colourA, colourB) {
  return function (_ref2) {
    var t = _ref2.t;
    return lerpColour(fromCss(colourA), fromCss(colourB), t);
  };
};
var greySweep = mkSweep('#222', '#aaa');
var toCss = function toCss(colour) {
  return typeof colour === 'string' ? colour : "rgb(".concat(colour.r, ", ").concat(colour.g, ", ").concat(colour.b, ")");
};
var interpretCssChannel = function interpretCssChannel(channelStr) {
  return channelStr.length === 1 ? channelStr + channelStr : channelStr;
};
var fromCss = function fromCss(colour) {
  if (typeof colour !== 'string') {
    return colour;
  }

  var matches = /^\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*$/.exec(colour);

  if (!matches) {
    throw new Error("Could not parse colour string");
  }

  var rgb = {
    r: parseInt(interpretCssChannel(matches[1]), 16),
    g: parseInt(interpretCssChannel(matches[2]), 16),
    b: parseInt(interpretCssChannel(matches[3]), 16)
  };
  return rgb;
};

/***/ }),

/***/ "./src/frame.js":
/*!**********************!*\
  !*** ./src/frame.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/array.js");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path */ "./src/path.js");
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maths */ "./src/maths.js");
/* harmony import */ var _colours__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colours */ "./src/colours.js");




/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var parentId = _ref.parentId,
      renderFn = _ref.renderFn,
      width = _ref.width,
      height = _ref.height,
      t = _ref.t;
  var lineCount = 30;
  var thickness = Math.ceil(height / lineCount);
  var resolution = Object(_maths__WEBPACK_IMPORTED_MODULE_2__["round"])(width / 12);
  var rampSize = 0.1;
  var startWiggleX = 0.3;
  var endWiggleX = 0.6;
  var startWiggleY = 0.3;
  var endWiggleY = 0.6;
  var wiggleMagnitude = 50;
  var wiggleScale = 5;
  var wiggleSpeedDivisor = 5000;
  var bgColour = {
    r: 160,
    g: 100,
    b: 180
  };
  var colourScheme = Object(_colours__WEBPACK_IMPORTED_MODULE_3__["mkSweep"])({
    r: 5,
    g: 54,
    b: 134
  }, {
    r: 130,
    g: 210,
    b: 245
  }); // Heights for each line

  var yValues = Object(_array__WEBPACK_IMPORTED_MODULE_0__["arrayOf"])(lineCount); // A straight, horizontal path at each height from screen left to right

  var paths = Object(_path__WEBPACK_IMPORTED_MODULE_1__["buildPaths"])(yValues, thickness, width, resolution); // Wiggle the paths between startWiggleT and endWiggleY

  var wiggly = paths.map(function (path, idx) {
    var y = idx / paths.length;
    return y >= startWiggleY && y < endWiggleY ? Object(_path__WEBPACK_IMPORTED_MODULE_1__["wigglePath"])({
      path: path,
      startT: startWiggleX,
      endT: endWiggleX,
      rampSize: rampSize,
      magnitude: wiggleMagnitude,
      scale: wiggleScale,
      t: t / wiggleSpeedDivisor
    }) : path;
  }); // Replace straight paths with just their endpoints - faster renders

  var curves = Object(_path__WEBPACK_IMPORTED_MODULE_1__["simplifyPaths"])({
    paths: wiggly,
    startY: startWiggleY,
    endY: endWiggleY
  });
  renderFn({
    curves: curves,
    thickness: thickness,
    bgColour: bgColour,
    colourFn: colourScheme,
    width: width,
    height: height,
    parentId: parentId
  });
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frame */ "./src/frame.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/canvas.js");


var fps = 30;
var frameDelta = 1 / fps * 1000;
var parentId = 'gerhardt';
document.addEventListener('DOMContentLoaded', function () {
  var lastT = 0;

  var renderFrame = function renderFrame(t) {
    window.requestAnimationFrame(renderFrame); // Limit to 

    if (t - lastT < frameDelta) {
      return;
    }

    lastT = t;
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    Object(_frame__WEBPACK_IMPORTED_MODULE_0__["default"])({
      parentId: parentId,
      renderFn: _canvas__WEBPACK_IMPORTED_MODULE_1__["render"],
      width: width,
      height: height,
      t: t
    });
  };

  window.requestAnimationFrame(renderFrame);
});
window.addEventListener('error', function (err) {
  alert("".concat(err.filename, " ").concat(err.lineno, ":").concat(err.colno, ": ").concat(err.message));
});

/***/ }),

/***/ "./src/maths.js":
/*!**********************!*\
  !*** ./src/maths.js ***!
  \**********************/
/*! exports provided: aleaRandom, random, round, makeRandom, noise2D, step, smoothstep, clamp, impulse, lerp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aleaRandom", function() { return aleaRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeRandom", function() { return makeRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noise2D", function() { return noise2D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "step", function() { return step; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smoothstep", function() { return smoothstep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "impulse", function() { return impulse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/simplex-noise.js");
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simplex_noise__WEBPACK_IMPORTED_MODULE_0__);
var _arguments = arguments;
 // From simplex-noise

var aleaRandom = function aleaRandom() {
  // Johannes Baagøe <baagoe@baagoe.com>, 2010
  var s0 = 0;
  var s1 = 0;
  var s2 = 0;
  var c = 1;
  var mash = masher();
  s0 = mash(' ');
  s1 = mash(' ');
  s2 = mash(' ');

  for (var i = 0; i < _arguments.length; i++) {
    s0 -= mash(_arguments[i]);

    if (s0 < 0) {
      s0 += 1;
    }

    s1 -= mash(_arguments[i]);

    if (s1 < 0) {
      s1 += 1;
    }

    s2 -= mash(_arguments[i]);

    if (s2 < 0) {
      s2 += 1;
    }
  }

  mash = null;
  return function () {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  };
};

function masher() {
  var n = 0xefc8249d;
  return function (data) {
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

var randomSeed = 101;
var random = aleaRandom(randomSeed);
var round = Math.round;
var makeRandom = aleaRandom;
var simplexNoise = new simplex_noise__WEBPACK_IMPORTED_MODULE_0___default.a(random);
var noise2D = simplexNoise.noise2D.bind(simplexNoise);
var step = function step(x, thresh) {
  return x >= thresh ? 1 : 0;
};
var smoothstep = function smoothstep(x, lo, hi) {
  var xClamped = clamp(x, lo, hi);
  return xClamped * xClamped * (3 - 2 * xClamped);
};
var clamp = function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}; //        ______
//       /      \
// _____/        \_____
// |   |  |   |  |    |
// 0   t0 t1  t2 t3   1
//

var impulse = function impulse(_ref) {
  var t = _ref.t,
      rampUp = _ref.rampUp,
      rampDown = _ref.rampDown,
      rampSize = _ref.rampSize;

  if (t < rampUp || t >= rampDown + rampSize) {
    return 0;
  }

  if (t < rampUp + rampSize) {
    return smoothstep((t - rampUp) / rampSize, 0, 1);
  }

  if (t < rampDown) {
    return 1;
  } //f t >= rampDown


  return 1 - smoothstep((t - rampDown) / rampSize, 0, 1);
};
var lerp = function lerp(a, b, t) {
  return a + (b - a) * t;
};

/***/ }),

/***/ "./src/path.js":
/*!*********************!*\
  !*** ./src/path.js ***!
  \*********************/
/*! exports provided: segment1D, horizontalSegment, buildPaths, lineWidth, lineHeight, wigglePath, simplifyPaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "segment1D", function() { return segment1D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "horizontalSegment", function() { return horizontalSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildPaths", function() { return buildPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineWidth", function() { return lineWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineHeight", function() { return lineHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wigglePath", function() { return wigglePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simplifyPaths", function() { return simplifyPaths; });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/array.js");
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maths */ "./src/maths.js");


var segment1D = function segment1D(a, b, resolution) {
  return Object(_array__WEBPACK_IMPORTED_MODULE_0__["arrayOf"])(resolution + 1).map(function (segmentIdx) {
    return a + segmentIdx / resolution * (b - a);
  });
};
var horizontalSegment = function horizontalSegment(p1, p2, resolution) {
  return segment1D(p1.x, p2.x, resolution).map(function (x) {
    return {
      x: x,
      y: p1.y
    };
  });
};
var buildPaths = function buildPaths(yValues, thickness, width, resolution) {
  return yValues.map(function (y) {
    return horizontalSegment({
      x: 0,
      y: y * thickness
    }, {
      x: width,
      y: y * thickness
    }, resolution);
  });
};
var lineWidth = function lineWidth(line) {
  return Math.abs(line[line.length - 1].x - line[0].x);
};
var lineHeight = function lineHeight(line) {
  return Math.abs(line[line.length - 1].y - line[0].y);
};
var wigglePath = function wigglePath(_ref) {
  var path = _ref.path,
      startT = _ref.startT,
      endT = _ref.endT,
      rampSize = _ref.rampSize,
      magnitude = _ref.magnitude,
      scale = _ref.scale,
      t = _ref.t;
  return path.map(function (pt, idx) {
    var pathT = idx / path.length;
    var tWiggle = Object(_maths__WEBPACK_IMPORTED_MODULE_1__["impulse"])({
      t: pathT,
      rampUp: startT,
      rampDown: endT,
      rampSize: rampSize
    });
    var perturbation = Object(_maths__WEBPACK_IMPORTED_MODULE_1__["noise2D"])(pathT * scale, pt.y + t);
    return {
      x: pt.x,
      y: pt.y + perturbation * magnitude * tWiggle
    };
  });
};
var simplifyPaths = function simplifyPaths(_ref2) {
  var paths = _ref2.paths,
      startY = _ref2.startY,
      endY = _ref2.endY;
  return paths.map(function (path, idx) {
    var t = idx / paths.length;

    if (t >= startY && t < endY) {
      return path;
    }

    return [path[0], path[path.length - 1]];
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXgtbm9pc2Uvc2ltcGxleC1ub2lzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29sb3Vycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRocy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC5qcyJdLCJuYW1lcyI6WyJhcnJheU9mIiwibiIsIkFycmF5IiwiZnJvbSIsImtleXMiLCJERUJVR19TSVpFIiwibWFrZUNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwicGFyZW50IiwibmV3Q2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXIiLCJjdXJ2ZXMiLCJ0aGlja25lc3MiLCJiZ0NvbG91ciIsImNvbG91ckZuIiwiZGVidWciLCJwYXJlbnRJZCIsImdldEVsZW1lbnRCeUlkIiwiY2FudmFzIiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsImN4dCIsImdldENvbnRleHQiLCJzYXZlIiwidHJhbnNsYXRlIiwiZmlsbFN0eWxlIiwidG9Dc3MiLCJmaWxsUmVjdCIsImxpbmVXaWR0aCIsImZvckVhY2giLCJjdXJ2ZSIsImlkeCIsInQiLCJsZW5ndGgiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsIngiLCJ5IiwicHQiLCJsaW5lVG8iLCJzdHJva2UiLCJyZXN0b3JlIiwibWtBbHRlcm5hdGVDb2xvdXJzIiwiY29sb3VyQSIsImNvbG91ckIiLCJncmV5U3RyaXBlcyIsInJhbmRvbUNvbG91ckJhc2UiLCJyYW5kb21Db2xvdXJDaGFubmVsIiwicm5nIiwicm91bmQiLCJyYW5kb21Db2xvdXIiLCJtYWtlUmFuZG9tIiwiciIsImciLCJiIiwibGVycENvbG91ciIsImEiLCJsZXJwIiwibWtTd2VlcCIsImZyb21Dc3MiLCJncmV5U3dlZXAiLCJjb2xvdXIiLCJpbnRlcnByZXRDc3NDaGFubmVsIiwiY2hhbm5lbFN0ciIsIm1hdGNoZXMiLCJleGVjIiwiRXJyb3IiLCJyZ2IiLCJwYXJzZUludCIsInJlbmRlckZuIiwibGluZUNvdW50IiwiTWF0aCIsImNlaWwiLCJyZXNvbHV0aW9uIiwicmFtcFNpemUiLCJzdGFydFdpZ2dsZVgiLCJlbmRXaWdnbGVYIiwic3RhcnRXaWdnbGVZIiwiZW5kV2lnZ2xlWSIsIndpZ2dsZU1hZ25pdHVkZSIsIndpZ2dsZVNjYWxlIiwid2lnZ2xlU3BlZWREaXZpc29yIiwiY29sb3VyU2NoZW1lIiwieVZhbHVlcyIsInBhdGhzIiwiYnVpbGRQYXRocyIsIndpZ2dseSIsIm1hcCIsInBhdGgiLCJ3aWdnbGVQYXRoIiwic3RhcnRUIiwiZW5kVCIsIm1hZ25pdHVkZSIsInNjYWxlIiwic2ltcGxpZnlQYXRocyIsInN0YXJ0WSIsImVuZFkiLCJmcHMiLCJmcmFtZURlbHRhIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxhc3RUIiwicmVuZGVyRnJhbWUiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImZyYW1lIiwiZXJyIiwiYWxlcnQiLCJmaWxlbmFtZSIsImxpbmVubyIsImNvbG5vIiwibWVzc2FnZSIsImFsZWFSYW5kb20iLCJzMCIsInMxIiwiczIiLCJjIiwibWFzaCIsIm1hc2hlciIsImkiLCJhcmd1bWVudHMiLCJkYXRhIiwidG9TdHJpbmciLCJjaGFyQ29kZUF0IiwiaCIsInJhbmRvbVNlZWQiLCJyYW5kb20iLCJzaW1wbGV4Tm9pc2UiLCJTaW1wbGV4Tm9pc2UiLCJub2lzZTJEIiwiYmluZCIsInN0ZXAiLCJ0aHJlc2giLCJzbW9vdGhzdGVwIiwibG8iLCJoaSIsInhDbGFtcGVkIiwiY2xhbXAiLCJpbXB1bHNlIiwicmFtcFVwIiwicmFtcERvd24iLCJzZWdtZW50MUQiLCJzZWdtZW50SWR4IiwiaG9yaXpvbnRhbFNlZ21lbnQiLCJwMSIsInAyIiwibGluZSIsImFicyIsImxpbmVIZWlnaHQiLCJwYXRoVCIsInRXaWdnbGUiLCJwZXJ0dXJiYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0I7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLElBQTJDLEVBQUUsbUNBQU8sWUFBWSxxQkFBcUI7QUFBQSxvR0FBQztBQUM1RjtBQUNBLE1BQU0sSUFBOEI7QUFDcEM7QUFDQSxPQUFPLEVBQXNFO0FBQzdFO0FBQ0EsTUFBTSxJQUE2QjtBQUNuQztBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN4ZEQ7QUFBQTtBQUFPLElBQU1BLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLENBQUQ7QUFBQSxTQUFPQyxLQUFLLENBQUNDLElBQU4sQ0FBV0QsS0FBSyxDQUFDRCxDQUFELENBQUwsQ0FBU0csSUFBVCxFQUFYLENBQVA7QUFBQSxDQUFoQixDOzs7Ozs7Ozs7Ozs7QUNBUDtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQU1DLFVBQVUsR0FBRyxDQUFuQjs7QUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxLQUFELEVBQVFDLE1BQVIsRUFBZ0JDLE1BQWhCLEVBQTJCO0FBQzVDLE1BQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWxCO0FBQ0FGLFdBQVMsQ0FBQ0gsS0FBVixHQUFrQkEsS0FBbEI7QUFDQUcsV0FBUyxDQUFDRixNQUFWLEdBQW1CQSxNQUFuQjtBQUNBQyxRQUFNLENBQUNJLFdBQVAsQ0FBbUJILFNBQW5CO0FBQ0EsU0FBT0EsU0FBUDtBQUNELENBTkQ7O0FBUU8sSUFBTUksTUFBTSxHQUFHLFNBQVRBLE1BQVMsT0FBK0U7QUFBQSxNQUE1RUMsTUFBNEUsUUFBNUVBLE1BQTRFO0FBQUEsTUFBcEVDLFNBQW9FLFFBQXBFQSxTQUFvRTtBQUFBLE1BQXpEQyxRQUF5RCxRQUF6REEsUUFBeUQ7QUFBQSxNQUEvQ0MsUUFBK0MsUUFBL0NBLFFBQStDO0FBQUEsTUFBckNYLEtBQXFDLFFBQXJDQSxLQUFxQztBQUFBLE1BQTlCQyxNQUE4QixRQUE5QkEsTUFBOEI7QUFBQSxNQUF0QlcsS0FBc0IsUUFBdEJBLEtBQXNCO0FBQUEsTUFBZkMsUUFBZSxRQUFmQSxRQUFlO0FBQ25HO0FBQ0EsTUFBTVgsTUFBTSxHQUFHRSxRQUFRLENBQUNVLGNBQVQsQ0FBd0JELFFBQXhCLENBQWY7QUFDQSxNQUFJRSxNQUFNLEdBQUdiLE1BQU0sQ0FBQ2MsVUFBcEI7O0FBQ0EsTUFBSSxDQUFDRCxNQUFELElBQVdBLE1BQU0sQ0FBQ2YsS0FBUCxLQUFpQkEsS0FBNUIsSUFBcUNlLE1BQU0sQ0FBQ2QsTUFBUCxLQUFrQkEsTUFBM0QsRUFBbUU7QUFDakUsUUFBSWMsTUFBSixFQUFZO0FBQ1ZBLFlBQU0sQ0FBQ0UsTUFBUDtBQUNEOztBQUNERixVQUFNLEdBQUdoQixVQUFVLENBQUNDLEtBQUQsRUFBUUMsTUFBUixFQUFnQkMsTUFBaEIsQ0FBbkI7QUFDRDs7QUFFRCxNQUFNZ0IsR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUVBRCxLQUFHLENBQUNFLElBQUo7QUFFQUYsS0FBRyxDQUFDRyxTQUFKLENBQWMsQ0FBZCxFQUFpQlosU0FBUyxHQUFDLENBQTNCLEVBZm1HLENBaUJuRzs7QUFDQVMsS0FBRyxDQUFDSSxTQUFKLEdBQWdCQyxzREFBSyxDQUFDYixRQUFELENBQXJCO0FBQ0FRLEtBQUcsQ0FBQ00sUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJ4QixLQUFuQixFQUEwQkMsTUFBMUIsRUFuQm1HLENBcUJuRzs7QUFDQWlCLEtBQUcsQ0FBQ08sU0FBSixHQUFnQmhCLFNBQWhCO0FBQ0FELFFBQU0sQ0FBQ2tCLE9BQVAsQ0FBZSxVQUFDQyxLQUFELEVBQVFDLEdBQVIsRUFBZ0I7QUFDN0IsUUFBTUMsQ0FBQyxHQUFHRCxHQUFHLEdBQUdwQixNQUFNLENBQUNzQixNQUF2QjtBQUNBWixPQUFHLENBQUNhLFNBQUo7QUFDQWIsT0FBRyxDQUFDYyxXQUFKLEdBQWtCVCxzREFBSyxDQUFDWixRQUFRLENBQUM7QUFBRWlCLFNBQUcsRUFBSEEsR0FBRjtBQUFPQyxPQUFDLEVBQURBO0FBQVAsS0FBRCxDQUFULENBQXZCO0FBQ0FYLE9BQUcsQ0FBQ2UsTUFBSixDQUFXTixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNPLENBQXBCLEVBQXVCUCxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNRLENBQWhDO0FBQ0FSLFNBQUssQ0FBQ0QsT0FBTixDQUFjLFVBQUFVLEVBQUU7QUFBQSxhQUFJbEIsR0FBRyxDQUFDbUIsTUFBSixDQUFXRCxFQUFFLENBQUNGLENBQWQsRUFBaUJFLEVBQUUsQ0FBQ0QsQ0FBcEIsQ0FBSjtBQUFBLEtBQWhCO0FBQ0FqQixPQUFHLENBQUNvQixNQUFKO0FBQ0QsR0FQRDs7QUFTQSxNQUFJMUIsS0FBSixFQUFXO0FBQ1RNLE9BQUcsQ0FBQ0ksU0FBSixHQUFnQixNQUFoQjtBQUNBZCxVQUFNLENBQUNrQixPQUFQLENBQWUsVUFBQUMsS0FBSztBQUFBLGFBQUlBLEtBQUssQ0FBQ0QsT0FBTixDQUFjLFVBQUFVLEVBQUU7QUFBQSxlQUFJbEIsR0FBRyxDQUFDTSxRQUFKLENBQWFZLEVBQUUsQ0FBQ0YsQ0FBSCxHQUFPcEMsVUFBcEIsRUFBZ0NzQyxFQUFFLENBQUNELENBQUgsR0FBT3JDLFVBQXZDLEVBQW1EQSxVQUFuRCxFQUErREEsVUFBL0QsQ0FBSjtBQUFBLE9BQWhCLENBQUo7QUFBQSxLQUFwQjtBQUNEOztBQUVEb0IsS0FBRyxDQUFDcUIsT0FBSjtBQUNELENBdENNLEM7Ozs7Ozs7Ozs7OztBQ1pQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sSUFBTUMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQixDQUFDQyxPQUFELEVBQVVDLE9BQVY7QUFBQSxTQUFzQjtBQUFBLFFBQUdkLEdBQUgsUUFBR0EsR0FBSDtBQUFBLFdBQWFBLEdBQUcsR0FBRyxDQUFOLEdBQVVhLE9BQVYsR0FBb0JDLE9BQWpDO0FBQUEsR0FBdEI7QUFBQSxDQUEzQjtBQUNBLElBQU1DLFdBQVcsR0FBR0gsa0JBQWtCLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBdEM7QUFFUCxJQUFNSSxnQkFBZ0IsR0FBRyxFQUF6QjtBQUNPLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsR0FBRDtBQUFBLFNBQVNDLG9EQUFLLENBQUNILGdCQUFnQixHQUFJRSxHQUFHLEtBQUssR0FBN0IsQ0FBZDtBQUFBLENBQTVCO0FBRUEsSUFBTUUsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxNQUFDRixHQUFELHVFQUFPRyx5REFBVSxDQUFDLEdBQUQsQ0FBakI7QUFBQSxTQUE0QjtBQUN0REMsS0FBQyxFQUFFTCxtQkFBbUIsQ0FBQ0MsR0FBRCxDQURnQztBQUV0REssS0FBQyxFQUFFTixtQkFBbUIsQ0FBQ0MsR0FBRCxDQUZnQztBQUd0RE0sS0FBQyxFQUFFUCxtQkFBbUIsQ0FBQ0MsR0FBRDtBQUhnQyxHQUE1QjtBQUFBLENBQXJCO0FBTUEsSUFBTU8sVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsQ0FBRCxFQUFJRixDQUFKLEVBQU92QixDQUFQO0FBQUEsU0FBYztBQUN0Q3FCLEtBQUMsRUFBRUssbURBQUksQ0FBQ0QsQ0FBQyxDQUFDSixDQUFILEVBQU1FLENBQUMsQ0FBQ0YsQ0FBUixFQUFXckIsQ0FBWCxDQUQrQjtBQUV0Q3NCLEtBQUMsRUFBRUksbURBQUksQ0FBQ0QsQ0FBQyxDQUFDSCxDQUFILEVBQU1DLENBQUMsQ0FBQ0QsQ0FBUixFQUFXdEIsQ0FBWCxDQUYrQjtBQUd0Q3VCLEtBQUMsRUFBRUcsbURBQUksQ0FBQ0QsQ0FBQyxDQUFDRixDQUFILEVBQU1BLENBQUMsQ0FBQ0EsQ0FBUixFQUFXdkIsQ0FBWDtBQUgrQixHQUFkO0FBQUEsQ0FBbkI7QUFNQSxJQUFNMkIsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ2YsT0FBRCxFQUFVQyxPQUFWO0FBQUEsU0FBc0I7QUFBQSxRQUFHYixDQUFILFNBQUdBLENBQUg7QUFBQSxXQUFXd0IsVUFBVSxDQUFDSSxPQUFPLENBQUNoQixPQUFELENBQVIsRUFBbUJnQixPQUFPLENBQUNmLE9BQUQsQ0FBMUIsRUFBcUNiLENBQXJDLENBQXJCO0FBQUEsR0FBdEI7QUFBQSxDQUFoQjtBQUNBLElBQU02QixTQUFTLEdBQUdGLE9BQU8sQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUF6QjtBQUVBLElBQU1qQyxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBb0MsTUFBTTtBQUFBLFNBQUksT0FBT0EsTUFBUCxLQUFtQixRQUFuQixHQUE4QkEsTUFBOUIsaUJBQThDQSxNQUFNLENBQUNULENBQXJELGVBQTJEUyxNQUFNLENBQUNSLENBQWxFLGVBQXdFUSxNQUFNLENBQUNQLENBQS9FLE1BQUo7QUFBQSxDQUFwQjtBQUNBLElBQU1RLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsVUFBRDtBQUFBLFNBQWdCQSxVQUFVLENBQUMvQixNQUFYLEtBQXNCLENBQXRCLEdBQTBCK0IsVUFBVSxHQUFDQSxVQUFyQyxHQUFrREEsVUFBbEU7QUFBQSxDQUE1QjtBQUNBLElBQU1KLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUFFLE1BQU0sRUFBSTtBQUMvQixNQUFJLE9BQU9BLE1BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDL0IsV0FBT0EsTUFBUDtBQUNEOztBQUNELE1BQU1HLE9BQU8sR0FBRyx1RkFBdUZDLElBQXZGLENBQTRGSixNQUE1RixDQUFoQjs7QUFDQSxNQUFJLENBQUNHLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSUUsS0FBSixpQ0FBTjtBQUNEOztBQUNELE1BQU1DLEdBQUcsR0FBRztBQUNWZixLQUFDLEVBQUVnQixRQUFRLENBQUNOLG1CQUFtQixDQUFDRSxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQXBCLEVBQWtDLEVBQWxDLENBREQ7QUFFVlgsS0FBQyxFQUFFZSxRQUFRLENBQUNOLG1CQUFtQixDQUFDRSxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQXBCLEVBQWtDLEVBQWxDLENBRkQ7QUFHVlYsS0FBQyxFQUFFYyxRQUFRLENBQUNOLG1CQUFtQixDQUFDRSxPQUFPLENBQUMsQ0FBRCxDQUFSLENBQXBCLEVBQWtDLEVBQWxDO0FBSEQsR0FBWjtBQUtBLFNBQU9HLEdBQVA7QUFDRCxDQWRNLEM7Ozs7Ozs7Ozs7OztBQ3pCUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHZSwrRUFBOEM7QUFBQSxNQUEzQ3BELFFBQTJDLFFBQTNDQSxRQUEyQztBQUFBLE1BQWpDc0QsUUFBaUMsUUFBakNBLFFBQWlDO0FBQUEsTUFBdkJuRSxLQUF1QixRQUF2QkEsS0FBdUI7QUFBQSxNQUFoQkMsTUFBZ0IsUUFBaEJBLE1BQWdCO0FBQUEsTUFBUjRCLENBQVEsUUFBUkEsQ0FBUTtBQUMzRCxNQUFNdUMsU0FBUyxHQUFHLEVBQWxCO0FBQ0EsTUFBTTNELFNBQVMsR0FBRzRELElBQUksQ0FBQ0MsSUFBTCxDQUFVckUsTUFBTSxHQUFHbUUsU0FBbkIsQ0FBbEI7QUFDQSxNQUFNRyxVQUFVLEdBQUd4QixvREFBSyxDQUFDL0MsS0FBSyxHQUFHLEVBQVQsQ0FBeEI7QUFDQSxNQUFNd0UsUUFBUSxHQUFHLEdBQWpCO0FBQ0EsTUFBTUMsWUFBWSxHQUFHLEdBQXJCO0FBQ0EsTUFBTUMsVUFBVSxHQUFHLEdBQW5CO0FBQ0EsTUFBTUMsWUFBWSxHQUFHLEdBQXJCO0FBQ0EsTUFBTUMsVUFBVSxHQUFHLEdBQW5CO0FBQ0EsTUFBTUMsZUFBZSxHQUFHLEVBQXhCO0FBQ0EsTUFBTUMsV0FBVyxHQUFHLENBQXBCO0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsSUFBM0I7QUFDQSxNQUFNckUsUUFBUSxHQUFHO0FBQUV3QyxLQUFDLEVBQUUsR0FBTDtBQUFVQyxLQUFDLEVBQUUsR0FBYjtBQUFrQkMsS0FBQyxFQUFFO0FBQXJCLEdBQWpCO0FBQ0EsTUFBTTRCLFlBQVksR0FBR3hCLHdEQUFPLENBQUM7QUFBRU4sS0FBQyxFQUFFLENBQUw7QUFBUUMsS0FBQyxFQUFFLEVBQVg7QUFBZUMsS0FBQyxFQUFFO0FBQWxCLEdBQUQsRUFBMEI7QUFBRUYsS0FBQyxFQUFFLEdBQUw7QUFBVUMsS0FBQyxFQUFFLEdBQWI7QUFBa0JDLEtBQUMsRUFBRTtBQUFyQixHQUExQixDQUE1QixDQWIyRCxDQWUzRDs7QUFDQSxNQUFNNkIsT0FBTyxHQUFHeEYsc0RBQU8sQ0FBQzJFLFNBQUQsQ0FBdkIsQ0FoQjJELENBa0IzRDs7QUFDQSxNQUFNYyxLQUFLLEdBQUdDLHdEQUFVLENBQUNGLE9BQUQsRUFBVXhFLFNBQVYsRUFBcUJULEtBQXJCLEVBQTRCdUUsVUFBNUIsQ0FBeEIsQ0FuQjJELENBcUIzRDs7QUFDQSxNQUFNYSxNQUFNLEdBQUdGLEtBQUssQ0FBQ0csR0FBTixDQUFVLFVBQUNDLElBQUQsRUFBTzFELEdBQVAsRUFBZTtBQUN0QyxRQUFNTyxDQUFDLEdBQUdQLEdBQUcsR0FBR3NELEtBQUssQ0FBQ3BELE1BQXRCO0FBQ0EsV0FBT0ssQ0FBQyxJQUFJd0MsWUFBTCxJQUFxQnhDLENBQUMsR0FBR3lDLFVBQXpCLEdBQ0hXLHdEQUFVLENBQUM7QUFDVEQsVUFBSSxFQUFKQSxJQURTO0FBRVRFLFlBQU0sRUFBRWYsWUFGQztBQUdUZ0IsVUFBSSxFQUFFZixVQUhHO0FBSVRGLGNBQVEsRUFBUkEsUUFKUztBQUtUa0IsZUFBUyxFQUFFYixlQUxGO0FBTVRjLFdBQUssRUFBRWIsV0FORTtBQU9UakQsT0FBQyxFQUFFQSxDQUFDLEdBQUdrRDtBQVBFLEtBQUQsQ0FEUCxHQVVITyxJQVZKO0FBV0QsR0FiYyxDQUFmLENBdEIyRCxDQXFDM0Q7O0FBQ0EsTUFBTTlFLE1BQU0sR0FBR29GLDJEQUFhLENBQUM7QUFBRVYsU0FBSyxFQUFFRSxNQUFUO0FBQWlCUyxVQUFNLEVBQUVsQixZQUF6QjtBQUF1Q21CLFFBQUksRUFBRWxCO0FBQTdDLEdBQUQsQ0FBNUI7QUFFQVQsVUFBUSxDQUFDO0FBQ1AzRCxVQUFNLEVBQU5BLE1BRE87QUFFUEMsYUFBUyxFQUFUQSxTQUZPO0FBR1BDLFlBQVEsRUFBUkEsUUFITztBQUlQQyxZQUFRLEVBQUVxRSxZQUpIO0FBS1BoRixTQUFLLEVBQUxBLEtBTE87QUFNUEMsVUFBTSxFQUFOQSxNQU5PO0FBT1BZLFlBQVEsRUFBUkE7QUFQTyxHQUFELENBQVI7QUFTRCxDQWpERCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBTWtGLEdBQUcsR0FBRyxFQUFaO0FBQ0EsSUFBTUMsVUFBVSxHQUFJLElBQUlELEdBQUwsR0FBWSxJQUEvQjtBQUNBLElBQU1sRixRQUFRLEdBQUcsVUFBakI7QUFFQVQsUUFBUSxDQUFDNkYsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBSUMsS0FBSyxHQUFHLENBQVo7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3RFLENBQUQsRUFBTztBQUN6QnVFLFVBQU0sQ0FBQ0MscUJBQVAsQ0FBNkJGLFdBQTdCLEVBRHlCLENBRXpCOztBQUNBLFFBQUl0RSxDQUFDLEdBQUdxRSxLQUFKLEdBQVlGLFVBQWhCLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBQ0RFLFNBQUssR0FBR3JFLENBQVI7QUFDQSxRQUFNN0IsS0FBSyxHQUFHSSxRQUFRLENBQUNrRyxlQUFULENBQXlCQyxXQUF2QztBQUNBLFFBQU10RyxNQUFNLEdBQUdHLFFBQVEsQ0FBQ2tHLGVBQVQsQ0FBeUJFLFlBQXhDO0FBQ0FDLDBEQUFLLENBQUM7QUFBRTVGLGNBQVEsRUFBUkEsUUFBRjtBQUFZc0QsY0FBUSxFQUFSQSw4Q0FBWjtBQUFzQm5FLFdBQUssRUFBTEEsS0FBdEI7QUFBNkJDLFlBQU0sRUFBTkEsTUFBN0I7QUFBcUM0QixPQUFDLEVBQURBO0FBQXJDLEtBQUQsQ0FBTDtBQUNELEdBVkQ7O0FBV0F1RSxRQUFNLENBQUNDLHFCQUFQLENBQTZCRixXQUE3QjtBQUNELENBZEQ7QUFnQkFDLE1BQU0sQ0FBQ0gsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBQ1MsR0FBRCxFQUFTO0FBQ3hDQyxPQUFLLFdBQUlELEdBQUcsQ0FBQ0UsUUFBUixjQUFvQkYsR0FBRyxDQUFDRyxNQUF4QixjQUFrQ0gsR0FBRyxDQUFDSSxLQUF0QyxlQUFnREosR0FBRyxDQUFDSyxPQUFwRCxFQUFMO0FBQ0QsQ0FGRCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQ3JCQTs7QUFDTyxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQzlCO0FBQ0EsTUFBSUMsRUFBRSxHQUFHLENBQVQ7QUFDQSxNQUFJQyxFQUFFLEdBQUcsQ0FBVDtBQUNBLE1BQUlDLEVBQUUsR0FBRyxDQUFUO0FBQ0EsTUFBSUMsQ0FBQyxHQUFHLENBQVI7QUFFQSxNQUFJQyxJQUFJLEdBQUdDLE1BQU0sRUFBakI7QUFDQUwsSUFBRSxHQUFHSSxJQUFJLENBQUMsR0FBRCxDQUFUO0FBQ0FILElBQUUsR0FBR0csSUFBSSxDQUFDLEdBQUQsQ0FBVDtBQUNBRixJQUFFLEdBQUdFLElBQUksQ0FBQyxHQUFELENBQVQ7O0FBRUEsT0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyxVQUFTLENBQUMxRixNQUE5QixFQUFzQ3lGLENBQUMsRUFBdkMsRUFBMkM7QUFDekNOLE1BQUUsSUFBSUksSUFBSSxDQUFDRyxVQUFTLENBQUNELENBQUQsQ0FBVixDQUFWOztBQUNBLFFBQUlOLEVBQUUsR0FBRyxDQUFULEVBQVk7QUFDVkEsUUFBRSxJQUFJLENBQU47QUFDRDs7QUFDREMsTUFBRSxJQUFJRyxJQUFJLENBQUNHLFVBQVMsQ0FBQ0QsQ0FBRCxDQUFWLENBQVY7O0FBQ0EsUUFBSUwsRUFBRSxHQUFHLENBQVQsRUFBWTtBQUNWQSxRQUFFLElBQUksQ0FBTjtBQUNEOztBQUNEQyxNQUFFLElBQUlFLElBQUksQ0FBQ0csVUFBUyxDQUFDRCxDQUFELENBQVYsQ0FBVjs7QUFDQSxRQUFJSixFQUFFLEdBQUcsQ0FBVCxFQUFZO0FBQ1ZBLFFBQUUsSUFBSSxDQUFOO0FBQ0Q7QUFDRjs7QUFDREUsTUFBSSxHQUFHLElBQVA7QUFDQSxTQUFPLFlBQVc7QUFDaEIsUUFBSXhGLENBQUMsR0FBRyxVQUFVb0YsRUFBVixHQUFlRyxDQUFDLEdBQUcsc0JBQTNCLENBRGdCLENBQ21DOztBQUNuREgsTUFBRSxHQUFHQyxFQUFMO0FBQ0FBLE1BQUUsR0FBR0MsRUFBTDtBQUNBLFdBQU9BLEVBQUUsR0FBR3RGLENBQUMsSUFBSXVGLENBQUMsR0FBR3ZGLENBQUMsR0FBRyxDQUFaLENBQWI7QUFDRCxHQUxEO0FBTUQsQ0FqQ007O0FBbUNQLFNBQVN5RixNQUFULEdBQWtCO0FBQ2hCLE1BQUk1SCxDQUFDLEdBQUcsVUFBUjtBQUNBLFNBQU8sVUFBUytILElBQVQsRUFBZTtBQUNwQkEsUUFBSSxHQUFHQSxJQUFJLENBQUNDLFFBQUwsRUFBUDs7QUFDQSxTQUFLLElBQUlILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdFLElBQUksQ0FBQzNGLE1BQXpCLEVBQWlDeUYsQ0FBQyxFQUFsQyxFQUFzQztBQUNwQzdILE9BQUMsSUFBSStILElBQUksQ0FBQ0UsVUFBTCxDQUFnQkosQ0FBaEIsQ0FBTDtBQUNBLFVBQUlLLENBQUMsR0FBRyxzQkFBc0JsSSxDQUE5QjtBQUNBQSxPQUFDLEdBQUdrSSxDQUFDLEtBQUssQ0FBVjtBQUNBQSxPQUFDLElBQUlsSSxDQUFMO0FBQ0FrSSxPQUFDLElBQUlsSSxDQUFMO0FBQ0FBLE9BQUMsR0FBR2tJLENBQUMsS0FBSyxDQUFWO0FBQ0FBLE9BQUMsSUFBSWxJLENBQUw7QUFDQUEsT0FBQyxJQUFJa0ksQ0FBQyxHQUFHLFdBQVQsQ0FSb0MsQ0FRZDtBQUN2Qjs7QUFDRCxXQUFPLENBQUNsSSxDQUFDLEtBQUssQ0FBUCxJQUFZLHNCQUFuQixDQVpvQixDQVl1QjtBQUM1QyxHQWJEO0FBY0Q7O0FBRUQsSUFBTW1JLFVBQVUsR0FBRyxHQUFuQjtBQUNPLElBQU1DLE1BQU0sR0FBR2QsVUFBVSxDQUFDYSxVQUFELENBQXpCO0FBQ0EsSUFBTTlFLEtBQUssR0FBR3NCLElBQUksQ0FBQ3RCLEtBQW5CO0FBRUEsSUFBTUUsVUFBVSxHQUFHK0QsVUFBbkI7QUFFUCxJQUFNZSxZQUFZLEdBQUcsSUFBSUMsb0RBQUosQ0FBaUJGLE1BQWpCLENBQXJCO0FBQ08sSUFBTUcsT0FBTyxHQUFHRixZQUFZLENBQUNFLE9BQWIsQ0FBcUJDLElBQXJCLENBQTBCSCxZQUExQixDQUFoQjtBQUVBLElBQU1JLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNqRyxDQUFELEVBQUlrRyxNQUFKO0FBQUEsU0FBZWxHLENBQUMsSUFBSWtHLE1BQUwsR0FBYyxDQUFkLEdBQWtCLENBQWpDO0FBQUEsQ0FBYjtBQUVBLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNuRyxDQUFELEVBQUlvRyxFQUFKLEVBQVFDLEVBQVIsRUFBZTtBQUN2QyxNQUFNQyxRQUFRLEdBQUdDLEtBQUssQ0FBQ3ZHLENBQUQsRUFBSW9HLEVBQUosRUFBUUMsRUFBUixDQUF0QjtBQUNBLFNBQU9DLFFBQVEsR0FBR0EsUUFBWCxJQUF1QixJQUFJLElBQUlBLFFBQS9CLENBQVA7QUFDRCxDQUhNO0FBS0EsSUFBTUMsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQ3ZHLENBQUQsRUFBSW9HLEVBQUosRUFBUUMsRUFBUjtBQUFBLFNBQWVyRyxDQUFDLEdBQUdvRyxFQUFKLEdBQVNBLEVBQVQsR0FBZXBHLENBQUMsR0FBR3FHLEVBQUosR0FBU0EsRUFBVCxHQUFjckcsQ0FBNUM7QUFBQSxDQUFkLEMsQ0FFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sSUFBTXdHLE9BQU8sR0FBRyxTQUFWQSxPQUFVLE9BQXFDO0FBQUEsTUFBbkM3RyxDQUFtQyxRQUFuQ0EsQ0FBbUM7QUFBQSxNQUFoQzhHLE1BQWdDLFFBQWhDQSxNQUFnQztBQUFBLE1BQXhCQyxRQUF3QixRQUF4QkEsUUFBd0I7QUFBQSxNQUFkcEUsUUFBYyxRQUFkQSxRQUFjOztBQUMxRCxNQUFJM0MsQ0FBQyxHQUFHOEcsTUFBSixJQUFjOUcsQ0FBQyxJQUFJK0csUUFBUSxHQUFHcEUsUUFBbEMsRUFBNEM7QUFDMUMsV0FBTyxDQUFQO0FBQ0Q7O0FBQ0QsTUFBSTNDLENBQUMsR0FBRzhHLE1BQU0sR0FBR25FLFFBQWpCLEVBQTJCO0FBQ3pCLFdBQU82RCxVQUFVLENBQUMsQ0FBQ3hHLENBQUMsR0FBQzhHLE1BQUgsSUFBV25FLFFBQVosRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FBakI7QUFDRDs7QUFDRCxNQUFJM0MsQ0FBQyxHQUFHK0csUUFBUixFQUFrQjtBQUNoQixXQUFPLENBQVA7QUFDRCxHQVR5RCxDQVUxRDs7O0FBQ0EsU0FBTyxJQUFJUCxVQUFVLENBQUMsQ0FBQ3hHLENBQUMsR0FBQytHLFFBQUgsSUFBYXBFLFFBQWQsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBckI7QUFDRCxDQVpNO0FBY0EsSUFBTWpCLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNELENBQUQsRUFBSUYsQ0FBSixFQUFPdkIsQ0FBUDtBQUFBLFNBQWF5QixDQUFDLEdBQUcsQ0FBQ0YsQ0FBQyxHQUFDRSxDQUFILElBQU16QixDQUF2QjtBQUFBLENBQWIsQzs7Ozs7Ozs7Ozs7O0FDOUZQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVPLElBQU1nSCxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDdkYsQ0FBRCxFQUFJRixDQUFKLEVBQU9tQixVQUFQO0FBQUEsU0FBc0I5RSxzREFBTyxDQUFDOEUsVUFBVSxHQUFDLENBQVosQ0FBUCxDQUFzQmMsR0FBdEIsQ0FBMEIsVUFBQXlELFVBQVU7QUFBQSxXQUFJeEYsQ0FBQyxHQUFLd0YsVUFBVSxHQUFDdkUsVUFBWixJQUEyQm5CLENBQUMsR0FBQ0UsQ0FBN0IsQ0FBVDtBQUFBLEdBQXBDLENBQXRCO0FBQUEsQ0FBbEI7QUFDQSxJQUFNeUYsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDQyxFQUFELEVBQUtDLEVBQUwsRUFBUzFFLFVBQVQ7QUFBQSxTQUF3QnNFLFNBQVMsQ0FBQ0csRUFBRSxDQUFDOUcsQ0FBSixFQUFPK0csRUFBRSxDQUFDL0csQ0FBVixFQUFhcUMsVUFBYixDQUFULENBQWtDYyxHQUFsQyxDQUFzQyxVQUFBbkQsQ0FBQztBQUFBLFdBQU07QUFBRUEsT0FBQyxFQUFEQSxDQUFGO0FBQUtDLE9BQUMsRUFBRTZHLEVBQUUsQ0FBQzdHO0FBQVgsS0FBTjtBQUFBLEdBQXZDLENBQXhCO0FBQUEsQ0FBMUI7QUFFQSxJQUFNZ0QsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0YsT0FBRCxFQUFVeEUsU0FBVixFQUFxQlQsS0FBckIsRUFBNEJ1RSxVQUE1QjtBQUFBLFNBQTJDVSxPQUFPLENBQUNJLEdBQVIsQ0FBWSxVQUFBbEQsQ0FBQztBQUFBLFdBQUk0RyxpQkFBaUIsQ0FDckc7QUFBRTdHLE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRUEsQ0FBQyxHQUFHMUI7QUFBZixLQURxRyxFQUVyRztBQUFFeUIsT0FBQyxFQUFFbEMsS0FBTDtBQUFZbUMsT0FBQyxFQUFFQSxDQUFDLEdBQUcxQjtBQUFuQixLQUZxRyxFQUdyRzhELFVBSHFHLENBQXJCO0FBQUEsR0FBYixDQUEzQztBQUFBLENBQW5CO0FBTUEsSUFBTTlDLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUF5SCxJQUFJO0FBQUEsU0FBSTdFLElBQUksQ0FBQzhFLEdBQUwsQ0FBU0QsSUFBSSxDQUFDQSxJQUFJLENBQUNwSCxNQUFMLEdBQVksQ0FBYixDQUFKLENBQW9CSSxDQUFwQixHQUF3QmdILElBQUksQ0FBQyxDQUFELENBQUosQ0FBUWhILENBQXpDLENBQUo7QUFBQSxDQUF0QjtBQUNBLElBQU1rSCxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBRixJQUFJO0FBQUEsU0FBSTdFLElBQUksQ0FBQzhFLEdBQUwsQ0FBU0QsSUFBSSxDQUFDQSxJQUFJLENBQUNwSCxNQUFMLEdBQVksQ0FBYixDQUFKLENBQW9CSyxDQUFwQixHQUF3QitHLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUS9HLENBQXpDLENBQUo7QUFBQSxDQUF2QjtBQUVBLElBQU1vRCxVQUFVLEdBQUcsU0FBYkEsVUFBYTtBQUFBLE1BQUdELElBQUgsUUFBR0EsSUFBSDtBQUFBLE1BQVNFLE1BQVQsUUFBU0EsTUFBVDtBQUFBLE1BQWlCQyxJQUFqQixRQUFpQkEsSUFBakI7QUFBQSxNQUF1QmpCLFFBQXZCLFFBQXVCQSxRQUF2QjtBQUFBLE1BQWlDa0IsU0FBakMsUUFBaUNBLFNBQWpDO0FBQUEsTUFBNENDLEtBQTVDLFFBQTRDQSxLQUE1QztBQUFBLE1BQW1EOUQsQ0FBbkQsUUFBbURBLENBQW5EO0FBQUEsU0FBMkR5RCxJQUFJLENBQUNELEdBQUwsQ0FBUyxVQUFDakQsRUFBRCxFQUFLUixHQUFMLEVBQWE7QUFDekcsUUFBTXlILEtBQUssR0FBR3pILEdBQUcsR0FBRzBELElBQUksQ0FBQ3hELE1BQXpCO0FBQ0EsUUFBTXdILE9BQU8sR0FBR1osc0RBQU8sQ0FBQztBQUFDN0csT0FBQyxFQUFFd0gsS0FBSjtBQUFXVixZQUFNLEVBQUVuRCxNQUFuQjtBQUEyQm9ELGNBQVEsRUFBRW5ELElBQXJDO0FBQTJDakIsY0FBUSxFQUFSQTtBQUEzQyxLQUFELENBQXZCO0FBQ0EsUUFBTStFLFlBQVksR0FBR3RCLHNEQUFPLENBQUNvQixLQUFLLEdBQUcxRCxLQUFULEVBQWdCdkQsRUFBRSxDQUFDRCxDQUFILEdBQU9OLENBQXZCLENBQTVCO0FBQ0EsV0FBTztBQUNMSyxPQUFDLEVBQUVFLEVBQUUsQ0FBQ0YsQ0FERDtBQUVMQyxPQUFDLEVBQUVDLEVBQUUsQ0FBQ0QsQ0FBSCxHQUFPb0gsWUFBWSxHQUFHN0QsU0FBZixHQUEyQjREO0FBRmhDLEtBQVA7QUFJRCxHQVJvRixDQUEzRDtBQUFBLENBQW5CO0FBVUEsSUFBTTFELGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0I7QUFBQSxNQUFHVixLQUFILFNBQUdBLEtBQUg7QUFBQSxNQUFVVyxNQUFWLFNBQVVBLE1BQVY7QUFBQSxNQUFrQkMsSUFBbEIsU0FBa0JBLElBQWxCO0FBQUEsU0FBNkJaLEtBQUssQ0FBQ0csR0FBTixDQUFVLFVBQUNDLElBQUQsRUFBTzFELEdBQVAsRUFBZTtBQUNqRixRQUFNQyxDQUFDLEdBQUdELEdBQUcsR0FBR3NELEtBQUssQ0FBQ3BELE1BQXRCOztBQUNBLFFBQUlELENBQUMsSUFBSWdFLE1BQUwsSUFBZWhFLENBQUMsR0FBR2lFLElBQXZCLEVBQTZCO0FBQzNCLGFBQU9SLElBQVA7QUFDRDs7QUFDRCxXQUFPLENBQUNBLElBQUksQ0FBQyxDQUFELENBQUwsRUFBVUEsSUFBSSxDQUFDQSxJQUFJLENBQUN4RCxNQUFMLEdBQVksQ0FBYixDQUFkLENBQVA7QUFDRCxHQU55RCxDQUE3QjtBQUFBLENBQXRCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKlxuICogQSBmYXN0IGphdmFzY3JpcHQgaW1wbGVtZW50YXRpb24gb2Ygc2ltcGxleCBub2lzZSBieSBKb25hcyBXYWduZXJcblxuQmFzZWQgb24gYSBzcGVlZC1pbXByb3ZlZCBzaW1wbGV4IG5vaXNlIGFsZ29yaXRobSBmb3IgMkQsIDNEIGFuZCA0RCBpbiBKYXZhLlxuV2hpY2ggaXMgYmFzZWQgb24gZXhhbXBsZSBjb2RlIGJ5IFN0ZWZhbiBHdXN0YXZzb24gKHN0ZWd1QGl0bi5saXUuc2UpLlxuV2l0aCBPcHRpbWlzYXRpb25zIGJ5IFBldGVyIEVhc3RtYW4gKHBlYXN0bWFuQGRyaXp6bGUuc3RhbmZvcmQuZWR1KS5cbkJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXG5cblxuIENvcHlyaWdodCAoYykgMjAxOCBKb25hcyBXYWduZXJcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgRjIgPSAwLjUgKiAoTWF0aC5zcXJ0KDMuMCkgLSAxLjApO1xuICB2YXIgRzIgPSAoMy4wIC0gTWF0aC5zcXJ0KDMuMCkpIC8gNi4wO1xuICB2YXIgRjMgPSAxLjAgLyAzLjA7XG4gIHZhciBHMyA9IDEuMCAvIDYuMDtcbiAgdmFyIEY0ID0gKE1hdGguc3FydCg1LjApIC0gMS4wKSAvIDQuMDtcbiAgdmFyIEc0ID0gKDUuMCAtIE1hdGguc3FydCg1LjApKSAvIDIwLjA7XG5cbiAgZnVuY3Rpb24gU2ltcGxleE5vaXNlKHJhbmRvbU9yU2VlZCkge1xuICAgIHZhciByYW5kb207XG4gICAgaWYgKHR5cGVvZiByYW5kb21PclNlZWQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmFuZG9tID0gcmFuZG9tT3JTZWVkO1xuICAgIH1cbiAgICBlbHNlIGlmIChyYW5kb21PclNlZWQpIHtcbiAgICAgIHJhbmRvbSA9IGFsZWEocmFuZG9tT3JTZWVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZG9tID0gTWF0aC5yYW5kb207XG4gICAgfVxuICAgIHRoaXMucCA9IGJ1aWxkUGVybXV0YXRpb25UYWJsZShyYW5kb20pO1xuICAgIHRoaXMucGVybSA9IG5ldyBVaW50OEFycmF5KDUxMik7XG4gICAgdGhpcy5wZXJtTW9kMTIgPSBuZXcgVWludDhBcnJheSg1MTIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTEyOyBpKyspIHtcbiAgICAgIHRoaXMucGVybVtpXSA9IHRoaXMucFtpICYgMjU1XTtcbiAgICAgIHRoaXMucGVybU1vZDEyW2ldID0gdGhpcy5wZXJtW2ldICUgMTI7XG4gICAgfVxuXG4gIH1cbiAgU2ltcGxleE5vaXNlLnByb3RvdHlwZSA9IHtcbiAgICBncmFkMzogbmV3IEZsb2F0MzJBcnJheShbMSwgMSwgMCxcbiAgICAgIC0xLCAxLCAwLFxuICAgICAgMSwgLTEsIDAsXG5cbiAgICAgIC0xLCAtMSwgMCxcbiAgICAgIDEsIDAsIDEsXG4gICAgICAtMSwgMCwgMSxcblxuICAgICAgMSwgMCwgLTEsXG4gICAgICAtMSwgMCwgLTEsXG4gICAgICAwLCAxLCAxLFxuXG4gICAgICAwLCAtMSwgMSxcbiAgICAgIDAsIDEsIC0xLFxuICAgICAgMCwgLTEsIC0xXSksXG4gICAgZ3JhZDQ6IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDEsIDEsIDAsIDEsIDEsIC0xLCAwLCAxLCAtMSwgMSwgMCwgMSwgLTEsIC0xLFxuICAgICAgMCwgLTEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLFxuICAgICAgMSwgMCwgMSwgMSwgMSwgMCwgMSwgLTEsIDEsIDAsIC0xLCAxLCAxLCAwLCAtMSwgLTEsXG4gICAgICAtMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAtMSwgMCwgLTEsIDEsIC0xLCAwLCAtMSwgLTEsXG4gICAgICAxLCAxLCAwLCAxLCAxLCAxLCAwLCAtMSwgMSwgLTEsIDAsIDEsIDEsIC0xLCAwLCAtMSxcbiAgICAgIC0xLCAxLCAwLCAxLCAtMSwgMSwgMCwgLTEsIC0xLCAtMSwgMCwgMSwgLTEsIC0xLCAwLCAtMSxcbiAgICAgIDEsIDEsIDEsIDAsIDEsIDEsIC0xLCAwLCAxLCAtMSwgMSwgMCwgMSwgLTEsIC0xLCAwLFxuICAgICAgLTEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLCAwXSksXG4gICAgbm9pc2UyRDogZnVuY3Rpb24oeGluLCB5aW4pIHtcbiAgICAgIHZhciBwZXJtTW9kMTIgPSB0aGlzLnBlcm1Nb2QxMjtcbiAgICAgIHZhciBwZXJtID0gdGhpcy5wZXJtO1xuICAgICAgdmFyIGdyYWQzID0gdGhpcy5ncmFkMztcbiAgICAgIHZhciBuMCA9IDA7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgdmFyIG4xID0gMDtcbiAgICAgIHZhciBuMiA9IDA7XG4gICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXG4gICAgICB2YXIgcyA9ICh4aW4gKyB5aW4pICogRjI7IC8vIEhhaXJ5IGZhY3RvciBmb3IgMkRcbiAgICAgIHZhciBpID0gTWF0aC5mbG9vcih4aW4gKyBzKTtcbiAgICAgIHZhciBqID0gTWF0aC5mbG9vcih5aW4gKyBzKTtcbiAgICAgIHZhciB0ID0gKGkgKyBqKSAqIEcyO1xuICAgICAgdmFyIFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5KSBzcGFjZVxuICAgICAgdmFyIFkwID0gaiAtIHQ7XG4gICAgICB2YXIgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cbiAgICAgIHZhciB5MCA9IHlpbiAtIFkwO1xuICAgICAgLy8gRm9yIHRoZSAyRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhbiBlcXVpbGF0ZXJhbCB0cmlhbmdsZS5cbiAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cbiAgICAgIHZhciBpMSwgajE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCAobWlkZGxlKSBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqKSBjb29yZHNcbiAgICAgIGlmICh4MCA+IHkwKSB7XG4gICAgICAgIGkxID0gMTtcbiAgICAgICAgajEgPSAwO1xuICAgICAgfSAvLyBsb3dlciB0cmlhbmdsZSwgWFkgb3JkZXI6ICgwLDApLT4oMSwwKS0+KDEsMSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpMSA9IDA7XG4gICAgICAgIGoxID0gMTtcbiAgICAgIH0gLy8gdXBwZXIgdHJpYW5nbGUsIFlYIG9yZGVyOiAoMCwwKS0+KDAsMSktPigxLDEpXG4gICAgICAvLyBBIHN0ZXAgb2YgKDEsMCkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMpIGluICh4LHkpLCBhbmRcbiAgICAgIC8vIGEgc3RlcCBvZiAoMCwxKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYykgaW4gKHgseSksIHdoZXJlXG4gICAgICAvLyBjID0gKDMtc3FydCgzKSkvNlxuICAgICAgdmFyIHgxID0geDAgLSBpMSArIEcyOyAvLyBPZmZzZXRzIGZvciBtaWRkbGUgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgdmFyIHkxID0geTAgLSBqMSArIEcyO1xuICAgICAgdmFyIHgyID0geDAgLSAxLjAgKyAyLjAgKiBHMjsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICB2YXIgeTIgPSB5MCAtIDEuMCArIDIuMCAqIEcyO1xuICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSB0aHJlZSBzaW1wbGV4IGNvcm5lcnNcbiAgICAgIHZhciBpaSA9IGkgJiAyNTU7XG4gICAgICB2YXIgamogPSBqICYgMjU1O1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgdmFyIHQwID0gMC41IC0geDAgKiB4MCAtIHkwICogeTA7XG4gICAgICBpZiAodDAgPj0gMCkge1xuICAgICAgICB2YXIgZ2kwID0gcGVybU1vZDEyW2lpICsgcGVybVtqal1dICogMztcbiAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgIG4wID0gdDAgKiB0MCAqIChncmFkM1tnaTBdICogeDAgKyBncmFkM1tnaTAgKyAxXSAqIHkwKTsgLy8gKHgseSkgb2YgZ3JhZDMgdXNlZCBmb3IgMkQgZ3JhZGllbnRcbiAgICAgIH1cbiAgICAgIHZhciB0MSA9IDAuNSAtIHgxICogeDEgLSB5MSAqIHkxO1xuICAgICAgaWYgKHQxID49IDApIHtcbiAgICAgICAgdmFyIGdpMSA9IHBlcm1Nb2QxMltpaSArIGkxICsgcGVybVtqaiArIGoxXV0gKiAzO1xuICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgbjEgPSB0MSAqIHQxICogKGdyYWQzW2dpMV0gKiB4MSArIGdyYWQzW2dpMSArIDFdICogeTEpO1xuICAgICAgfVxuICAgICAgdmFyIHQyID0gMC41IC0geDIgKiB4MiAtIHkyICogeTI7XG4gICAgICBpZiAodDIgPj0gMCkge1xuICAgICAgICB2YXIgZ2kyID0gcGVybU1vZDEyW2lpICsgMSArIHBlcm1bamogKyAxXV0gKiAzO1xuICAgICAgICB0MiAqPSB0MjtcbiAgICAgICAgbjIgPSB0MiAqIHQyICogKGdyYWQzW2dpMl0gKiB4MiArIGdyYWQzW2dpMiArIDFdICogeTIpO1xuICAgICAgfVxuICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxuICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gcmV0dXJuIHZhbHVlcyBpbiB0aGUgaW50ZXJ2YWwgWy0xLDFdLlxuICAgICAgcmV0dXJuIDcwLjAgKiAobjAgKyBuMSArIG4yKTtcbiAgICB9LFxuICAgIC8vIDNEIHNpbXBsZXggbm9pc2VcbiAgICBub2lzZTNEOiBmdW5jdGlvbih4aW4sIHlpbiwgemluKSB7XG4gICAgICB2YXIgcGVybU1vZDEyID0gdGhpcy5wZXJtTW9kMTI7XG4gICAgICB2YXIgcGVybSA9IHRoaXMucGVybTtcbiAgICAgIHZhciBncmFkMyA9IHRoaXMuZ3JhZDM7XG4gICAgICB2YXIgbjAsIG4xLCBuMiwgbjM7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgZm91ciBjb3JuZXJzXG4gICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXG4gICAgICB2YXIgcyA9ICh4aW4gKyB5aW4gKyB6aW4pICogRjM7IC8vIFZlcnkgbmljZSBhbmQgc2ltcGxlIHNrZXcgZmFjdG9yIGZvciAzRFxuICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKHhpbiArIHMpO1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xuICAgICAgdmFyIGsgPSBNYXRoLmZsb29yKHppbiArIHMpO1xuICAgICAgdmFyIHQgPSAoaSArIGogKyBrKSAqIEczO1xuICAgICAgdmFyIFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5LHopIHNwYWNlXG4gICAgICB2YXIgWTAgPSBqIC0gdDtcbiAgICAgIHZhciBaMCA9IGsgLSB0O1xuICAgICAgdmFyIHgwID0geGluIC0gWDA7IC8vIFRoZSB4LHkseiBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cbiAgICAgIHZhciB5MCA9IHlpbiAtIFkwO1xuICAgICAgdmFyIHowID0gemluIC0gWjA7XG4gICAgICAvLyBGb3IgdGhlIDNEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGEgc2xpZ2h0bHkgaXJyZWd1bGFyIHRldHJhaGVkcm9uLlxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuICAgICAgdmFyIGkxLCBqMSwgazE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xuICAgICAgdmFyIGkyLCBqMiwgazI7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXG4gICAgICBpZiAoeDAgPj0geTApIHtcbiAgICAgICAgaWYgKHkwID49IHowKSB7XG4gICAgICAgICAgaTEgPSAxO1xuICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICBrMiA9IDA7XG4gICAgICAgIH0gLy8gWCBZIFogb3JkZXJcbiAgICAgICAgZWxzZSBpZiAoeDAgPj0gejApIHtcbiAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgajEgPSAwO1xuICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgajIgPSAwO1xuICAgICAgICAgIGsyID0gMTtcbiAgICAgICAgfSAvLyBYIFogWSBvcmRlclxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgajEgPSAwO1xuICAgICAgICAgIGsxID0gMTtcbiAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgajIgPSAwO1xuICAgICAgICAgIGsyID0gMTtcbiAgICAgICAgfSAvLyBaIFggWSBvcmRlclxuICAgICAgfVxuICAgICAgZWxzZSB7IC8vIHgwPHkwXG4gICAgICAgIGlmICh5MCA8IHowKSB7XG4gICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICBrMSA9IDE7XG4gICAgICAgICAgaTIgPSAwO1xuICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICBrMiA9IDE7XG4gICAgICAgIH0gLy8gWiBZIFggb3JkZXJcbiAgICAgICAgZWxzZSBpZiAoeDAgPCB6MCkge1xuICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICBqMSA9IDE7XG4gICAgICAgICAgazEgPSAwO1xuICAgICAgICAgIGkyID0gMDtcbiAgICAgICAgICBqMiA9IDE7XG4gICAgICAgICAgazIgPSAxO1xuICAgICAgICB9IC8vIFkgWiBYIG9yZGVyXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICBqMSA9IDE7XG4gICAgICAgICAgazEgPSAwO1xuICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICBqMiA9IDE7XG4gICAgICAgICAgazIgPSAwO1xuICAgICAgICB9IC8vIFkgWCBaIG9yZGVyXG4gICAgICB9XG4gICAgICAvLyBBIHN0ZXAgb2YgKDEsMCwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jLC1jKSBpbiAoeCx5LHopLFxuICAgICAgLy8gYSBzdGVwIG9mICgwLDEsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYywtYykgaW4gKHgseSx6KSwgYW5kXG4gICAgICAvLyBhIHN0ZXAgb2YgKDAsMCwxKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsLWMsMS1jKSBpbiAoeCx5LHopLCB3aGVyZVxuICAgICAgLy8gYyA9IDEvNi5cbiAgICAgIHZhciB4MSA9IHgwIC0gaTEgKyBHMzsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xuICAgICAgdmFyIHkxID0geTAgLSBqMSArIEczO1xuICAgICAgdmFyIHoxID0gejAgLSBrMSArIEczO1xuICAgICAgdmFyIHgyID0geDAgLSBpMiArIDIuMCAqIEczOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcbiAgICAgIHZhciB5MiA9IHkwIC0gajIgKyAyLjAgKiBHMztcbiAgICAgIHZhciB6MiA9IHowIC0gazIgKyAyLjAgKiBHMztcbiAgICAgIHZhciB4MyA9IHgwIC0gMS4wICsgMy4wICogRzM7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkseikgY29vcmRzXG4gICAgICB2YXIgeTMgPSB5MCAtIDEuMCArIDMuMCAqIEczO1xuICAgICAgdmFyIHozID0gejAgLSAxLjAgKyAzLjAgKiBHMztcbiAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgZm91ciBzaW1wbGV4IGNvcm5lcnNcbiAgICAgIHZhciBpaSA9IGkgJiAyNTU7XG4gICAgICB2YXIgamogPSBqICYgMjU1O1xuICAgICAgdmFyIGtrID0gayAmIDI1NTtcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIGZvdXIgY29ybmVyc1xuICAgICAgdmFyIHQwID0gMC42IC0geDAgKiB4MCAtIHkwICogeTAgLSB6MCAqIHowO1xuICAgICAgaWYgKHQwIDwgMCkgbjAgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMCA9IHBlcm1Nb2QxMltpaSArIHBlcm1bamogKyBwZXJtW2trXV1dICogMztcbiAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgIG4wID0gdDAgKiB0MCAqIChncmFkM1tnaTBdICogeDAgKyBncmFkM1tnaTAgKyAxXSAqIHkwICsgZ3JhZDNbZ2kwICsgMl0gKiB6MCk7XG4gICAgICB9XG4gICAgICB2YXIgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejE7XG4gICAgICBpZiAodDEgPCAwKSBuMSA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kxID0gcGVybU1vZDEyW2lpICsgaTEgKyBwZXJtW2pqICsgajEgKyBwZXJtW2trICsgazFdXV0gKiAzO1xuICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgbjEgPSB0MSAqIHQxICogKGdyYWQzW2dpMV0gKiB4MSArIGdyYWQzW2dpMSArIDFdICogeTEgKyBncmFkM1tnaTEgKyAyXSAqIHoxKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MiA9IDAuNiAtIHgyICogeDIgLSB5MiAqIHkyIC0gejIgKiB6MjtcbiAgICAgIGlmICh0MiA8IDApIG4yID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTIgPSBwZXJtTW9kMTJbaWkgKyBpMiArIHBlcm1bamogKyBqMiArIHBlcm1ba2sgKyBrMl1dXSAqIDM7XG4gICAgICAgIHQyICo9IHQyO1xuICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDNbZ2kyXSAqIHgyICsgZ3JhZDNbZ2kyICsgMV0gKiB5MiArIGdyYWQzW2dpMiArIDJdICogejIpO1xuICAgICAgfVxuICAgICAgdmFyIHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozO1xuICAgICAgaWYgKHQzIDwgMCkgbjMgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMyA9IHBlcm1Nb2QxMltpaSArIDEgKyBwZXJtW2pqICsgMSArIHBlcm1ba2sgKyAxXV1dICogMztcbiAgICAgICAgdDMgKj0gdDM7XG4gICAgICAgIG4zID0gdDMgKiB0MyAqIChncmFkM1tnaTNdICogeDMgKyBncmFkM1tnaTMgKyAxXSAqIHkzICsgZ3JhZDNbZ2kzICsgMl0gKiB6Myk7XG4gICAgICB9XG4gICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byBzdGF5IGp1c3QgaW5zaWRlIFstMSwxXVxuICAgICAgcmV0dXJuIDMyLjAgKiAobjAgKyBuMSArIG4yICsgbjMpO1xuICAgIH0sXG4gICAgLy8gNEQgc2ltcGxleCBub2lzZSwgYmV0dGVyIHNpbXBsZXggcmFuayBvcmRlcmluZyBtZXRob2QgMjAxMi0wMy0wOVxuICAgIG5vaXNlNEQ6IGZ1bmN0aW9uKHgsIHksIHosIHcpIHtcbiAgICAgIHZhciBwZXJtID0gdGhpcy5wZXJtO1xuICAgICAgdmFyIGdyYWQ0ID0gdGhpcy5ncmFkNDtcblxuICAgICAgdmFyIG4wLCBuMSwgbjIsIG4zLCBuNDsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBmaXZlIGNvcm5lcnNcbiAgICAgIC8vIFNrZXcgdGhlICh4LHkseix3KSBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggY2VsbCBvZiAyNCBzaW1wbGljZXMgd2UncmUgaW5cbiAgICAgIHZhciBzID0gKHggKyB5ICsgeiArIHcpICogRjQ7IC8vIEZhY3RvciBmb3IgNEQgc2tld2luZ1xuICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKHggKyBzKTtcbiAgICAgIHZhciBqID0gTWF0aC5mbG9vcih5ICsgcyk7XG4gICAgICB2YXIgayA9IE1hdGguZmxvb3IoeiArIHMpO1xuICAgICAgdmFyIGwgPSBNYXRoLmZsb29yKHcgKyBzKTtcbiAgICAgIHZhciB0ID0gKGkgKyBqICsgayArIGwpICogRzQ7IC8vIEZhY3RvciBmb3IgNEQgdW5za2V3aW5nXG4gICAgICB2YXIgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseix3KSBzcGFjZVxuICAgICAgdmFyIFkwID0gaiAtIHQ7XG4gICAgICB2YXIgWjAgPSBrIC0gdDtcbiAgICAgIHZhciBXMCA9IGwgLSB0O1xuICAgICAgdmFyIHgwID0geCAtIFgwOyAvLyBUaGUgeCx5LHosdyBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cbiAgICAgIHZhciB5MCA9IHkgLSBZMDtcbiAgICAgIHZhciB6MCA9IHogLSBaMDtcbiAgICAgIHZhciB3MCA9IHcgLSBXMDtcbiAgICAgIC8vIEZvciB0aGUgNEQgY2FzZSwgdGhlIHNpbXBsZXggaXMgYSA0RCBzaGFwZSBJIHdvbid0IGV2ZW4gdHJ5IHRvIGRlc2NyaWJlLlxuICAgICAgLy8gVG8gZmluZCBvdXQgd2hpY2ggb2YgdGhlIDI0IHBvc3NpYmxlIHNpbXBsaWNlcyB3ZSdyZSBpbiwgd2UgbmVlZCB0b1xuICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBtYWduaXR1ZGUgb3JkZXJpbmcgb2YgeDAsIHkwLCB6MCBhbmQgdzAuXG4gICAgICAvLyBTaXggcGFpci13aXNlIGNvbXBhcmlzb25zIGFyZSBwZXJmb3JtZWQgYmV0d2VlbiBlYWNoIHBvc3NpYmxlIHBhaXJcbiAgICAgIC8vIG9mIHRoZSBmb3VyIGNvb3JkaW5hdGVzLCBhbmQgdGhlIHJlc3VsdHMgYXJlIHVzZWQgdG8gcmFuayB0aGUgbnVtYmVycy5cbiAgICAgIHZhciByYW5reCA9IDA7XG4gICAgICB2YXIgcmFua3kgPSAwO1xuICAgICAgdmFyIHJhbmt6ID0gMDtcbiAgICAgIHZhciByYW5rdyA9IDA7XG4gICAgICBpZiAoeDAgPiB5MCkgcmFua3grKztcbiAgICAgIGVsc2UgcmFua3krKztcbiAgICAgIGlmICh4MCA+IHowKSByYW5reCsrO1xuICAgICAgZWxzZSByYW5reisrO1xuICAgICAgaWYgKHgwID4gdzApIHJhbmt4Kys7XG4gICAgICBlbHNlIHJhbmt3Kys7XG4gICAgICBpZiAoeTAgPiB6MCkgcmFua3krKztcbiAgICAgIGVsc2UgcmFua3orKztcbiAgICAgIGlmICh5MCA+IHcwKSByYW5reSsrO1xuICAgICAgZWxzZSByYW5rdysrO1xuICAgICAgaWYgKHowID4gdzApIHJhbmt6Kys7XG4gICAgICBlbHNlIHJhbmt3Kys7XG4gICAgICB2YXIgaTEsIGoxLCBrMSwgbDE7IC8vIFRoZSBpbnRlZ2VyIG9mZnNldHMgZm9yIHRoZSBzZWNvbmQgc2ltcGxleCBjb3JuZXJcbiAgICAgIHZhciBpMiwgajIsIGsyLCBsMjsgLy8gVGhlIGludGVnZXIgb2Zmc2V0cyBmb3IgdGhlIHRoaXJkIHNpbXBsZXggY29ybmVyXG4gICAgICB2YXIgaTMsIGozLCBrMywgbDM7IC8vIFRoZSBpbnRlZ2VyIG9mZnNldHMgZm9yIHRoZSBmb3VydGggc2ltcGxleCBjb3JuZXJcbiAgICAgIC8vIHNpbXBsZXhbY10gaXMgYSA0LXZlY3RvciB3aXRoIHRoZSBudW1iZXJzIDAsIDEsIDIgYW5kIDMgaW4gc29tZSBvcmRlci5cbiAgICAgIC8vIE1hbnkgdmFsdWVzIG9mIGMgd2lsbCBuZXZlciBvY2N1ciwgc2luY2UgZS5nLiB4Pnk+ej53IG1ha2VzIHg8eiwgeTx3IGFuZCB4PHdcbiAgICAgIC8vIGltcG9zc2libGUuIE9ubHkgdGhlIDI0IGluZGljZXMgd2hpY2ggaGF2ZSBub24temVybyBlbnRyaWVzIG1ha2UgYW55IHNlbnNlLlxuICAgICAgLy8gV2UgdXNlIGEgdGhyZXNob2xkaW5nIHRvIHNldCB0aGUgY29vcmRpbmF0ZXMgaW4gdHVybiBmcm9tIHRoZSBsYXJnZXN0IG1hZ25pdHVkZS5cbiAgICAgIC8vIFJhbmsgMyBkZW5vdGVzIHRoZSBsYXJnZXN0IGNvb3JkaW5hdGUuXG4gICAgICBpMSA9IHJhbmt4ID49IDMgPyAxIDogMDtcbiAgICAgIGoxID0gcmFua3kgPj0gMyA/IDEgOiAwO1xuICAgICAgazEgPSByYW5reiA+PSAzID8gMSA6IDA7XG4gICAgICBsMSA9IHJhbmt3ID49IDMgPyAxIDogMDtcbiAgICAgIC8vIFJhbmsgMiBkZW5vdGVzIHRoZSBzZWNvbmQgbGFyZ2VzdCBjb29yZGluYXRlLlxuICAgICAgaTIgPSByYW5reCA+PSAyID8gMSA6IDA7XG4gICAgICBqMiA9IHJhbmt5ID49IDIgPyAxIDogMDtcbiAgICAgIGsyID0gcmFua3ogPj0gMiA/IDEgOiAwO1xuICAgICAgbDIgPSByYW5rdyA+PSAyID8gMSA6IDA7XG4gICAgICAvLyBSYW5rIDEgZGVub3RlcyB0aGUgc2Vjb25kIHNtYWxsZXN0IGNvb3JkaW5hdGUuXG4gICAgICBpMyA9IHJhbmt4ID49IDEgPyAxIDogMDtcbiAgICAgIGozID0gcmFua3kgPj0gMSA/IDEgOiAwO1xuICAgICAgazMgPSByYW5reiA+PSAxID8gMSA6IDA7XG4gICAgICBsMyA9IHJhbmt3ID49IDEgPyAxIDogMDtcbiAgICAgIC8vIFRoZSBmaWZ0aCBjb3JuZXIgaGFzIGFsbCBjb29yZGluYXRlIG9mZnNldHMgPSAxLCBzbyBubyBuZWVkIHRvIGNvbXB1dGUgdGhhdC5cbiAgICAgIHZhciB4MSA9IHgwIC0gaTEgKyBHNDsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICB2YXIgeTEgPSB5MCAtIGoxICsgRzQ7XG4gICAgICB2YXIgejEgPSB6MCAtIGsxICsgRzQ7XG4gICAgICB2YXIgdzEgPSB3MCAtIGwxICsgRzQ7XG4gICAgICB2YXIgeDIgPSB4MCAtIGkyICsgMi4wICogRzQ7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICB2YXIgeTIgPSB5MCAtIGoyICsgMi4wICogRzQ7XG4gICAgICB2YXIgejIgPSB6MCAtIGsyICsgMi4wICogRzQ7XG4gICAgICB2YXIgdzIgPSB3MCAtIGwyICsgMi4wICogRzQ7XG4gICAgICB2YXIgeDMgPSB4MCAtIGkzICsgMy4wICogRzQ7IC8vIE9mZnNldHMgZm9yIGZvdXJ0aCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgdmFyIHkzID0geTAgLSBqMyArIDMuMCAqIEc0O1xuICAgICAgdmFyIHozID0gejAgLSBrMyArIDMuMCAqIEc0O1xuICAgICAgdmFyIHczID0gdzAgLSBsMyArIDMuMCAqIEc0O1xuICAgICAgdmFyIHg0ID0geDAgLSAxLjAgKyA0LjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgdmFyIHk0ID0geTAgLSAxLjAgKyA0LjAgKiBHNDtcbiAgICAgIHZhciB6NCA9IHowIC0gMS4wICsgNC4wICogRzQ7XG4gICAgICB2YXIgdzQgPSB3MCAtIDEuMCArIDQuMCAqIEc0O1xuICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmaXZlIHNpbXBsZXggY29ybmVyc1xuICAgICAgdmFyIGlpID0gaSAmIDI1NTtcbiAgICAgIHZhciBqaiA9IGogJiAyNTU7XG4gICAgICB2YXIga2sgPSBrICYgMjU1O1xuICAgICAgdmFyIGxsID0gbCAmIDI1NTtcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIGZpdmUgY29ybmVyc1xuICAgICAgdmFyIHQwID0gMC42IC0geDAgKiB4MCAtIHkwICogeTAgLSB6MCAqIHowIC0gdzAgKiB3MDtcbiAgICAgIGlmICh0MCA8IDApIG4wID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTAgPSAocGVybVtpaSArIHBlcm1bamogKyBwZXJtW2trICsgcGVybVtsbF1dXV0gJSAzMikgKiA0O1xuICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWQ0W2dpMF0gKiB4MCArIGdyYWQ0W2dpMCArIDFdICogeTAgKyBncmFkNFtnaTAgKyAyXSAqIHowICsgZ3JhZDRbZ2kwICsgM10gKiB3MCk7XG4gICAgICB9XG4gICAgICB2YXIgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejEgLSB3MSAqIHcxO1xuICAgICAgaWYgKHQxIDwgMCkgbjEgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMSA9IChwZXJtW2lpICsgaTEgKyBwZXJtW2pqICsgajEgKyBwZXJtW2trICsgazEgKyBwZXJtW2xsICsgbDFdXV1dICUgMzIpICogNDtcbiAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgIG4xID0gdDEgKiB0MSAqIChncmFkNFtnaTFdICogeDEgKyBncmFkNFtnaTEgKyAxXSAqIHkxICsgZ3JhZDRbZ2kxICsgMl0gKiB6MSArIGdyYWQ0W2dpMSArIDNdICogdzEpO1xuICAgICAgfVxuICAgICAgdmFyIHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyIC0gdzIgKiB3MjtcbiAgICAgIGlmICh0MiA8IDApIG4yID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTIgPSAocGVybVtpaSArIGkyICsgcGVybVtqaiArIGoyICsgcGVybVtrayArIGsyICsgcGVybVtsbCArIGwyXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQyICo9IHQyO1xuICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDRbZ2kyXSAqIHgyICsgZ3JhZDRbZ2kyICsgMV0gKiB5MiArIGdyYWQ0W2dpMiArIDJdICogejIgKyBncmFkNFtnaTIgKyAzXSAqIHcyKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MyA9IDAuNiAtIHgzICogeDMgLSB5MyAqIHkzIC0gejMgKiB6MyAtIHczICogdzM7XG4gICAgICBpZiAodDMgPCAwKSBuMyA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kzID0gKHBlcm1baWkgKyBpMyArIHBlcm1bamogKyBqMyArIHBlcm1ba2sgKyBrMyArIHBlcm1bbGwgKyBsM11dXV0gJSAzMikgKiA0O1xuICAgICAgICB0MyAqPSB0MztcbiAgICAgICAgbjMgPSB0MyAqIHQzICogKGdyYWQ0W2dpM10gKiB4MyArIGdyYWQ0W2dpMyArIDFdICogeTMgKyBncmFkNFtnaTMgKyAyXSAqIHozICsgZ3JhZDRbZ2kzICsgM10gKiB3Myk7XG4gICAgICB9XG4gICAgICB2YXIgdDQgPSAwLjYgLSB4NCAqIHg0IC0geTQgKiB5NCAtIHo0ICogejQgLSB3NCAqIHc0O1xuICAgICAgaWYgKHQ0IDwgMCkgbjQgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpNCA9IChwZXJtW2lpICsgMSArIHBlcm1bamogKyAxICsgcGVybVtrayArIDEgKyBwZXJtW2xsICsgMV1dXV0gJSAzMikgKiA0O1xuICAgICAgICB0NCAqPSB0NDtcbiAgICAgICAgbjQgPSB0NCAqIHQ0ICogKGdyYWQ0W2dpNF0gKiB4NCArIGdyYWQ0W2dpNCArIDFdICogeTQgKyBncmFkNFtnaTQgKyAyXSAqIHo0ICsgZ3JhZDRbZ2k0ICsgM10gKiB3NCk7XG4gICAgICB9XG4gICAgICAvLyBTdW0gdXAgYW5kIHNjYWxlIHRoZSByZXN1bHQgdG8gY292ZXIgdGhlIHJhbmdlIFstMSwxXVxuICAgICAgcmV0dXJuIDI3LjAgKiAobjAgKyBuMSArIG4yICsgbjMgKyBuNCk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGJ1aWxkUGVybXV0YXRpb25UYWJsZShyYW5kb20pIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgcCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gICAgZm9yIChpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICBwW2ldID0gaTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IDI1NTsgaSsrKSB7XG4gICAgICB2YXIgciA9IGkgKyB+fihyYW5kb20oKSAqICgyNTYgLSBpKSk7XG4gICAgICB2YXIgYXV4ID0gcFtpXTtcbiAgICAgIHBbaV0gPSBwW3JdO1xuICAgICAgcFtyXSA9IGF1eDtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgU2ltcGxleE5vaXNlLl9idWlsZFBlcm11dGF0aW9uVGFibGUgPSBidWlsZFBlcm11dGF0aW9uVGFibGU7XG5cbiAgZnVuY3Rpb24gYWxlYSgpIHtcbiAgICAvLyBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTBcbiAgICB2YXIgczAgPSAwO1xuICAgIHZhciBzMSA9IDA7XG4gICAgdmFyIHMyID0gMDtcbiAgICB2YXIgYyA9IDE7XG5cbiAgICB2YXIgbWFzaCA9IG1hc2hlcigpO1xuICAgIHMwID0gbWFzaCgnICcpO1xuICAgIHMxID0gbWFzaCgnICcpO1xuICAgIHMyID0gbWFzaCgnICcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHMwIC09IG1hc2goYXJndW1lbnRzW2ldKTtcbiAgICAgIGlmIChzMCA8IDApIHtcbiAgICAgICAgczAgKz0gMTtcbiAgICAgIH1cbiAgICAgIHMxIC09IG1hc2goYXJndW1lbnRzW2ldKTtcbiAgICAgIGlmIChzMSA8IDApIHtcbiAgICAgICAgczEgKz0gMTtcbiAgICAgIH1cbiAgICAgIHMyIC09IG1hc2goYXJndW1lbnRzW2ldKTtcbiAgICAgIGlmIChzMiA8IDApIHtcbiAgICAgICAgczIgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgbWFzaCA9IG51bGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHQgPSAyMDkxNjM5ICogczAgKyBjICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICAgIHMwID0gczE7XG4gICAgICBzMSA9IHMyO1xuICAgICAgcmV0dXJuIHMyID0gdCAtIChjID0gdCB8IDApO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gbWFzaGVyKCkge1xuICAgIHZhciBuID0gMHhlZmM4MjQ5ZDtcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcbiAgICAgICAgbiA9IGggPj4+IDA7XG4gICAgICAgIGggLT0gbjtcbiAgICAgICAgaCAqPSBuO1xuICAgICAgICBuID0gaCA+Pj4gMDtcbiAgICAgICAgaCAtPSBuO1xuICAgICAgICBuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuICAgICAgfVxuICAgICAgcmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG4gICAgfTtcbiAgfVxuXG4gIC8vIGFtZFxuICBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGZ1bmN0aW9uKCkge3JldHVybiBTaW1wbGV4Tm9pc2U7fSk7XG4gIC8vIGNvbW1vbiBqc1xuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSBleHBvcnRzLlNpbXBsZXhOb2lzZSA9IFNpbXBsZXhOb2lzZTtcbiAgLy8gYnJvd3NlclxuICBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgd2luZG93LlNpbXBsZXhOb2lzZSA9IFNpbXBsZXhOb2lzZTtcbiAgLy8gbm9kZWpzXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gU2ltcGxleE5vaXNlO1xuICB9XG5cbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgYXJyYXlPZiA9IChuKSA9PiBBcnJheS5mcm9tKEFycmF5KG4pLmtleXMoKSk7XG4iLCJpbXBvcnQgeyB0b0NzcyB9IGZyb20gJy4vY29sb3Vycyc7XG5cbmNvbnN0IERFQlVHX1NJWkUgPSA0O1xuXG5jb25zdCBtYWtlQ2FudmFzID0gKHdpZHRoLCBoZWlnaHQsIHBhcmVudCkgPT4ge1xuICBjb25zdCBuZXdDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgbmV3Q2FudmFzLndpZHRoID0gd2lkdGg7XG4gIG5ld0NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChuZXdDYW52YXMpO1xuICByZXR1cm4gbmV3Q2FudmFzO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9ICh7IGN1cnZlcywgdGhpY2tuZXNzLCBiZ0NvbG91ciwgY29sb3VyRm4sIHdpZHRoLCBoZWlnaHQsIGRlYnVnLCBwYXJlbnRJZCB9KSA9PiB7XG4gIC8vIENyZWF0ZSB0aGUgY2FudmFzIGZpcnN0IHRpbWUgaW4gYW5kIHdoZW4gcGFnZSBkaW1lbnNpb25zIGNoYW5nZVxuICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRJZCk7XG4gIGxldCBjYW52YXMgPSBwYXJlbnQuZmlyc3RDaGlsZDtcbiAgaWYgKCFjYW52YXMgfHwgY2FudmFzLndpZHRoICE9PSB3aWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICBpZiAoY2FudmFzKSB7XG4gICAgICBjYW52YXMucmVtb3ZlKCk7XG4gICAgfVxuICAgIGNhbnZhcyA9IG1ha2VDYW52YXMod2lkdGgsIGhlaWdodCwgcGFyZW50KTtcbiAgfVxuXG4gIGNvbnN0IGN4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBcbiAgY3h0LnNhdmUoKTtcblxuICBjeHQudHJhbnNsYXRlKDAsIHRoaWNrbmVzcy8yKTtcblxuICAvLyBGaWxsIGJhY2tncm91bmRcbiAgY3h0LmZpbGxTdHlsZSA9IHRvQ3NzKGJnQ29sb3VyKTtcbiAgY3h0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gIC8vIFN0cm9rZSBwYXRoc1xuICBjeHQubGluZVdpZHRoID0gdGhpY2tuZXNzO1xuICBjdXJ2ZXMuZm9yRWFjaCgoY3VydmUsIGlkeCkgPT4ge1xuICAgIGNvbnN0IHQgPSBpZHggLyBjdXJ2ZXMubGVuZ3RoO1xuICAgIGN4dC5iZWdpblBhdGgoKTtcbiAgICBjeHQuc3Ryb2tlU3R5bGUgPSB0b0Nzcyhjb2xvdXJGbih7IGlkeCwgdCB9KSk7XG4gICAgY3h0Lm1vdmVUbyhjdXJ2ZVswXS54LCBjdXJ2ZVswXS55KTtcbiAgICBjdXJ2ZS5mb3JFYWNoKHB0ID0+IGN4dC5saW5lVG8ocHQueCwgcHQueSkpO1xuICAgIGN4dC5zdHJva2UoKTtcbiAgfSk7XG5cbiAgaWYgKGRlYnVnKSB7XG4gICAgY3h0LmZpbGxTdHlsZSA9ICcjMGYwJztcbiAgICBjdXJ2ZXMuZm9yRWFjaChjdXJ2ZSA9PiBjdXJ2ZS5mb3JFYWNoKHB0ID0+IGN4dC5maWxsUmVjdChwdC54IC0gREVCVUdfU0laRSwgcHQueSAtIERFQlVHX1NJWkUsIERFQlVHX1NJWkUsIERFQlVHX1NJWkUpKSk7XG4gIH1cblxuICBjeHQucmVzdG9yZSgpO1xufTtcbiIsImltcG9ydCB7IG1ha2VSYW5kb20sIHJvdW5kLCBsZXJwIH0gZnJvbSAnLi9tYXRocyc7XG5cbmV4cG9ydCBjb25zdCBta0FsdGVybmF0ZUNvbG91cnMgPSAoY29sb3VyQSwgY29sb3VyQikgPT4gKHsgaWR4IH0pID0+IGlkeCAlIDIgPyBjb2xvdXJBIDogY29sb3VyQjtcbmV4cG9ydCBjb25zdCBncmV5U3RyaXBlcyA9IG1rQWx0ZXJuYXRlQ29sb3VycygnIzY2NicsICcjY2NjJyk7XG5cbmNvbnN0IHJhbmRvbUNvbG91ckJhc2UgPSA2MDtcbmV4cG9ydCBjb25zdCByYW5kb21Db2xvdXJDaGFubmVsID0gKHJuZykgPT4gcm91bmQocmFuZG9tQ29sb3VyQmFzZSArIChybmcoKSAqIDEyOCkpO1xuXG5leHBvcnQgY29uc3QgcmFuZG9tQ29sb3VyID0gKHJuZyA9IG1ha2VSYW5kb20oMTA5KSkgPT4gKHtcbiAgcjogcmFuZG9tQ29sb3VyQ2hhbm5lbChybmcpLFxuICBnOiByYW5kb21Db2xvdXJDaGFubmVsKHJuZyksXG4gIGI6IHJhbmRvbUNvbG91ckNoYW5uZWwocm5nKVxufSk7XG5cbmV4cG9ydCBjb25zdCBsZXJwQ29sb3VyID0gKGEsIGIsIHQpID0+ICh7XG4gIHI6IGxlcnAoYS5yLCBiLnIsIHQpLFxuICBnOiBsZXJwKGEuZywgYi5nLCB0KSxcbiAgYjogbGVycChhLmIsIGIuYiwgdClcbn0pO1xuXG5leHBvcnQgY29uc3QgbWtTd2VlcCA9IChjb2xvdXJBLCBjb2xvdXJCKSA9PiAoeyB0IH0pID0+IGxlcnBDb2xvdXIoZnJvbUNzcyhjb2xvdXJBKSwgZnJvbUNzcyhjb2xvdXJCKSwgdCk7XG5leHBvcnQgY29uc3QgZ3JleVN3ZWVwID0gbWtTd2VlcCgnIzIyMicsICcjYWFhJyk7XG5cbmV4cG9ydCBjb25zdCB0b0NzcyA9IGNvbG91ciA9PiB0eXBlb2YoY29sb3VyKSA9PT0gJ3N0cmluZycgPyBjb2xvdXIgOiBgcmdiKCR7Y29sb3VyLnJ9LCAke2NvbG91ci5nfSwgJHtjb2xvdXIuYn0pYDtcbmV4cG9ydCBjb25zdCBpbnRlcnByZXRDc3NDaGFubmVsID0gKGNoYW5uZWxTdHIpID0+IGNoYW5uZWxTdHIubGVuZ3RoID09PSAxID8gY2hhbm5lbFN0citjaGFubmVsU3RyIDogY2hhbm5lbFN0cjtcbmV4cG9ydCBjb25zdCBmcm9tQ3NzID0gY29sb3VyID0+IHtcbiAgaWYgKHR5cGVvZihjb2xvdXIpICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBjb2xvdXI7XG4gIH1cbiAgY29uc3QgbWF0Y2hlcyA9IC9eXFxzKiMoWzAtOWEtZkEtRl1bMC05YS1mQS1GXT8pKFswLTlhLWZBLUZdWzAtOWEtZkEtRl0/KShbMC05YS1mQS1GXVswLTlhLWZBLUZdPylcXHMqJC8uZXhlYyhjb2xvdXIpO1xuICBpZiAoIW1hdGNoZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBwYXJzZSBjb2xvdXIgc3RyaW5nYCk7XG4gIH1cbiAgY29uc3QgcmdiID0ge1xuICAgIHI6IHBhcnNlSW50KGludGVycHJldENzc0NoYW5uZWwobWF0Y2hlc1sxXSksIDE2KSxcbiAgICBnOiBwYXJzZUludChpbnRlcnByZXRDc3NDaGFubmVsKG1hdGNoZXNbMl0pLCAxNiksXG4gICAgYjogcGFyc2VJbnQoaW50ZXJwcmV0Q3NzQ2hhbm5lbChtYXRjaGVzWzNdKSwgMTYpXG4gIH07XG4gIHJldHVybiByZ2I7XG59OyIsImltcG9ydCB7IGFycmF5T2YgfSBmcm9tIFwiLi9hcnJheVwiO1xuaW1wb3J0IHsgYnVpbGRQYXRocywgd2lnZ2xlUGF0aCwgc2ltcGxpZnlQYXRocyB9IGZyb20gXCIuL3BhdGhcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4vbWF0aHNcIjtcbmltcG9ydCB7IG1rU3dlZXAgfSBmcm9tIFwiLi9jb2xvdXJzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgKHsgcGFyZW50SWQsIHJlbmRlckZuLCB3aWR0aCwgaGVpZ2h0LCB0IH0pID0+IHtcbiAgY29uc3QgbGluZUNvdW50ID0gMzA7XG4gIGNvbnN0IHRoaWNrbmVzcyA9IE1hdGguY2VpbChoZWlnaHQgLyBsaW5lQ291bnQpO1xuICBjb25zdCByZXNvbHV0aW9uID0gcm91bmQod2lkdGggLyAxMik7XG4gIGNvbnN0IHJhbXBTaXplID0gMC4xO1xuICBjb25zdCBzdGFydFdpZ2dsZVggPSAwLjM7XG4gIGNvbnN0IGVuZFdpZ2dsZVggPSAwLjY7XG4gIGNvbnN0IHN0YXJ0V2lnZ2xlWSA9IDAuMztcbiAgY29uc3QgZW5kV2lnZ2xlWSA9IDAuNjtcbiAgY29uc3Qgd2lnZ2xlTWFnbml0dWRlID0gNTA7XG4gIGNvbnN0IHdpZ2dsZVNjYWxlID0gNTtcbiAgY29uc3Qgd2lnZ2xlU3BlZWREaXZpc29yID0gNTAwMDtcbiAgY29uc3QgYmdDb2xvdXIgPSB7IHI6IDE2MCwgZzogMTAwLCBiOiAxODAgfTtcbiAgY29uc3QgY29sb3VyU2NoZW1lID0gbWtTd2VlcCh7IHI6IDUsIGc6IDU0LCBiOiAxMzQgfSwgeyByOiAxMzAsIGc6IDIxMCwgYjogMjQ1IH0pO1xuICBcbiAgLy8gSGVpZ2h0cyBmb3IgZWFjaCBsaW5lXG4gIGNvbnN0IHlWYWx1ZXMgPSBhcnJheU9mKGxpbmVDb3VudCk7XG5cbiAgLy8gQSBzdHJhaWdodCwgaG9yaXpvbnRhbCBwYXRoIGF0IGVhY2ggaGVpZ2h0IGZyb20gc2NyZWVuIGxlZnQgdG8gcmlnaHRcbiAgY29uc3QgcGF0aHMgPSBidWlsZFBhdGhzKHlWYWx1ZXMsIHRoaWNrbmVzcywgd2lkdGgsIHJlc29sdXRpb24pO1xuXG4gIC8vIFdpZ2dsZSB0aGUgcGF0aHMgYmV0d2VlbiBzdGFydFdpZ2dsZVQgYW5kIGVuZFdpZ2dsZVlcbiAgY29uc3Qgd2lnZ2x5ID0gcGF0aHMubWFwKChwYXRoLCBpZHgpID0+IHtcbiAgICBjb25zdCB5ID0gaWR4IC8gcGF0aHMubGVuZ3RoO1xuICAgIHJldHVybiB5ID49IHN0YXJ0V2lnZ2xlWSAmJiB5IDwgZW5kV2lnZ2xlWVxuICAgICAgPyB3aWdnbGVQYXRoKHtcbiAgICAgICAgICBwYXRoLFxuICAgICAgICAgIHN0YXJ0VDogc3RhcnRXaWdnbGVYLFxuICAgICAgICAgIGVuZFQ6IGVuZFdpZ2dsZVgsXG4gICAgICAgICAgcmFtcFNpemUsXG4gICAgICAgICAgbWFnbml0dWRlOiB3aWdnbGVNYWduaXR1ZGUsXG4gICAgICAgICAgc2NhbGU6IHdpZ2dsZVNjYWxlLFxuICAgICAgICAgIHQ6IHQgLyB3aWdnbGVTcGVlZERpdmlzb3JcbiAgICAgICAgfSlcbiAgICAgIDogcGF0aDtcbiAgfSk7XG5cbiAgLy8gUmVwbGFjZSBzdHJhaWdodCBwYXRocyB3aXRoIGp1c3QgdGhlaXIgZW5kcG9pbnRzIC0gZmFzdGVyIHJlbmRlcnNcbiAgY29uc3QgY3VydmVzID0gc2ltcGxpZnlQYXRocyh7IHBhdGhzOiB3aWdnbHksIHN0YXJ0WTogc3RhcnRXaWdnbGVZLCBlbmRZOiBlbmRXaWdnbGVZIH0pO1xuXG4gIHJlbmRlckZuKHtcbiAgICBjdXJ2ZXMsXG4gICAgdGhpY2tuZXNzLFxuICAgIGJnQ29sb3VyLFxuICAgIGNvbG91ckZuOiBjb2xvdXJTY2hlbWUsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHBhcmVudElkXG4gIH0pO1xufTtcbiIsImltcG9ydCBmcmFtZSBmcm9tICcuL2ZyYW1lJztcbmltcG9ydCB7IHJlbmRlciBhcyByZW5kZXJGbiB9IGZyb20gJy4vY2FudmFzJztcblxuY29uc3QgZnBzID0gMzA7XG5jb25zdCBmcmFtZURlbHRhID0gKDEgLyBmcHMpICogMTAwMDtcbmNvbnN0IHBhcmVudElkID0gJ2dlcmhhcmR0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbGV0IGxhc3RUID0gMDtcbiAgY29uc3QgcmVuZGVyRnJhbWUgPSAodCkgPT4ge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyRnJhbWUpO1xuICAgIC8vIExpbWl0IHRvIFxuICAgIGlmICh0IC0gbGFzdFQgPCBmcmFtZURlbHRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxhc3RUID0gdDtcbiAgICBjb25zdCB3aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIGZyYW1lKHsgcGFyZW50SWQsIHJlbmRlckZuLCB3aWR0aCwgaGVpZ2h0LCB0IH0pO1xuICB9O1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckZyYW1lKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXJyKSA9PiB7XG4gIGFsZXJ0KGAke2Vyci5maWxlbmFtZX0gJHtlcnIubGluZW5vfToke2Vyci5jb2xub306ICR7ZXJyLm1lc3NhZ2V9YCk7XG59KTtcbiIsImltcG9ydCBTaW1wbGV4Tm9pc2UgZnJvbSAnc2ltcGxleC1ub2lzZSc7XG5cbi8vIEZyb20gc2ltcGxleC1ub2lzZVxuZXhwb3J0IGNvbnN0IGFsZWFSYW5kb20gPSAoKSA9PiB7XG4gIC8vIEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2UuY29tPiwgMjAxMFxuICB2YXIgczAgPSAwO1xuICB2YXIgczEgPSAwO1xuICB2YXIgczIgPSAwO1xuICB2YXIgYyA9IDE7XG5cbiAgdmFyIG1hc2ggPSBtYXNoZXIoKTtcbiAgczAgPSBtYXNoKCcgJyk7XG4gIHMxID0gbWFzaCgnICcpO1xuICBzMiA9IG1hc2goJyAnKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHMwIC09IG1hc2goYXJndW1lbnRzW2ldKTtcbiAgICBpZiAoczAgPCAwKSB7XG4gICAgICBzMCArPSAxO1xuICAgIH1cbiAgICBzMSAtPSBtYXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgaWYgKHMxIDwgMCkge1xuICAgICAgczEgKz0gMTtcbiAgICB9XG4gICAgczIgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgIGlmIChzMiA8IDApIHtcbiAgICAgIHMyICs9IDE7XG4gICAgfVxuICB9XG4gIG1hc2ggPSBudWxsO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAyMDkxNjM5ICogczAgKyBjICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICBzMCA9IHMxO1xuICAgIHMxID0gczI7XG4gICAgcmV0dXJuIHMyID0gdCAtIChjID0gdCB8IDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtYXNoZXIoKSB7XG4gIHZhciBuID0gMHhlZmM4MjQ5ZDtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbiArPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG4gICAgICB2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuICAgICAgbiA9IGggPj4+IDA7XG4gICAgICBoIC09IG47XG4gICAgICBoICo9IG47XG4gICAgICBuID0gaCA+Pj4gMDtcbiAgICAgIGggLT0gbjtcbiAgICAgIG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG4gICAgfVxuICAgIHJldHVybiAobiA+Pj4gMCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICB9O1xufVxuXG5jb25zdCByYW5kb21TZWVkID0gMTAxO1xuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IGFsZWFSYW5kb20ocmFuZG9tU2VlZCk7XG5leHBvcnQgY29uc3Qgcm91bmQgPSBNYXRoLnJvdW5kO1xuXG5leHBvcnQgY29uc3QgbWFrZVJhbmRvbSA9IGFsZWFSYW5kb207XG5cbmNvbnN0IHNpbXBsZXhOb2lzZSA9IG5ldyBTaW1wbGV4Tm9pc2UocmFuZG9tKTtcbmV4cG9ydCBjb25zdCBub2lzZTJEID0gc2ltcGxleE5vaXNlLm5vaXNlMkQuYmluZChzaW1wbGV4Tm9pc2UpO1xuXG5leHBvcnQgY29uc3Qgc3RlcCA9ICh4LCB0aHJlc2gpID0+IHggPj0gdGhyZXNoID8gMSA6IDA7XG5cbmV4cG9ydCBjb25zdCBzbW9vdGhzdGVwID0gKHgsIGxvLCBoaSkgPT4ge1xuICBjb25zdCB4Q2xhbXBlZCA9IGNsYW1wKHgsIGxvLCBoaSk7XG4gIHJldHVybiB4Q2xhbXBlZCAqIHhDbGFtcGVkICogKDMgLSAyICogeENsYW1wZWQpO1xufVxuXG5leHBvcnQgY29uc3QgY2xhbXAgPSAoeCwgbG8sIGhpKSA9PiB4IDwgbG8gPyBsbyA6ICh4ID4gaGkgPyBoaSA6IHgpO1xuXG4vLyAgICAgICAgX19fX19fXG4vLyAgICAgICAvICAgICAgXFxcbi8vIF9fX19fLyAgICAgICAgXFxfX19fX1xuLy8gfCAgIHwgIHwgICB8ICB8ICAgIHxcbi8vIDAgICB0MCB0MSAgdDIgdDMgICAxXG4vL1xuZXhwb3J0IGNvbnN0IGltcHVsc2UgPSAoe3QsIHJhbXBVcCwgcmFtcERvd24sIHJhbXBTaXplfSkgPT4ge1xuICBpZiAodCA8IHJhbXBVcCB8fCB0ID49IHJhbXBEb3duICsgcmFtcFNpemUpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAodCA8IHJhbXBVcCArIHJhbXBTaXplKSB7XG4gICAgcmV0dXJuIHNtb290aHN0ZXAoKHQtcmFtcFVwKS9yYW1wU2l6ZSwgMCwgMSk7XG4gIH1cbiAgaWYgKHQgPCByYW1wRG93bikge1xuICAgIHJldHVybiAxO1xuICB9XG4gIC8vZiB0ID49IHJhbXBEb3duXG4gIHJldHVybiAxIC0gc21vb3Roc3RlcCgodC1yYW1wRG93bikvcmFtcFNpemUsIDAsIDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGxlcnAgPSAoYSwgYiwgdCkgPT4gYSArIChiLWEpKnQ7XG4iLCJpbXBvcnQgeyBhcnJheU9mIH0gZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgeyBpbXB1bHNlLCBub2lzZTJEIH0gZnJvbSAnLi9tYXRocyc7XG5cbmV4cG9ydCBjb25zdCBzZWdtZW50MUQgPSAoYSwgYiwgcmVzb2x1dGlvbikgPT4gYXJyYXlPZihyZXNvbHV0aW9uKzEpLm1hcChzZWdtZW50SWR4ID0+IGEgKyAoKHNlZ21lbnRJZHgvcmVzb2x1dGlvbikgKiAoYi1hKSkpO1xuZXhwb3J0IGNvbnN0IGhvcml6b250YWxTZWdtZW50ID0gKHAxLCBwMiwgcmVzb2x1dGlvbikgPT4gc2VnbWVudDFEKHAxLngsIHAyLngsIHJlc29sdXRpb24pLm1hcCh4ID0+ICggeyB4LCB5OiBwMS55IH0pKTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkUGF0aHMgPSAoeVZhbHVlcywgdGhpY2tuZXNzLCB3aWR0aCwgcmVzb2x1dGlvbikgPT4geVZhbHVlcy5tYXAoeSA9PiBob3Jpem9udGFsU2VnbWVudChcbiAgeyB4OiAwLCB5OiB5ICogdGhpY2tuZXNzIH0sXG4gIHsgeDogd2lkdGgsIHk6IHkgKiB0aGlja25lc3MgfSxcbiAgcmVzb2x1dGlvblxuKSk7XG5cbmV4cG9ydCBjb25zdCBsaW5lV2lkdGggPSBsaW5lID0+IE1hdGguYWJzKGxpbmVbbGluZS5sZW5ndGgtMV0ueCAtIGxpbmVbMF0ueCk7XG5leHBvcnQgY29uc3QgbGluZUhlaWdodCA9IGxpbmUgPT4gTWF0aC5hYnMobGluZVtsaW5lLmxlbmd0aC0xXS55IC0gbGluZVswXS55KTtcblxuZXhwb3J0IGNvbnN0IHdpZ2dsZVBhdGggPSAoeyBwYXRoLCBzdGFydFQsIGVuZFQsIHJhbXBTaXplLCBtYWduaXR1ZGUsIHNjYWxlLCB0IH0pID0+IHBhdGgubWFwKChwdCwgaWR4KSA9PiB7XG4gIGNvbnN0IHBhdGhUID0gaWR4IC8gcGF0aC5sZW5ndGg7XG4gIGNvbnN0IHRXaWdnbGUgPSBpbXB1bHNlKHt0OiBwYXRoVCwgcmFtcFVwOiBzdGFydFQsIHJhbXBEb3duOiBlbmRULCByYW1wU2l6ZSB9KTtcbiAgY29uc3QgcGVydHVyYmF0aW9uID0gbm9pc2UyRChwYXRoVCAqIHNjYWxlLCBwdC55ICsgdCk7XG4gIHJldHVybiB7XG4gICAgeDogcHQueCxcbiAgICB5OiBwdC55ICsgcGVydHVyYmF0aW9uICogbWFnbml0dWRlICogdFdpZ2dsZVxuICB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBzaW1wbGlmeVBhdGhzID0gKHsgcGF0aHMsIHN0YXJ0WSwgZW5kWSB9KSA9PiBwYXRocy5tYXAoKHBhdGgsIGlkeCkgPT4ge1xuICBjb25zdCB0ID0gaWR4IC8gcGF0aHMubGVuZ3RoO1xuICBpZiAodCA+PSBzdGFydFkgJiYgdCA8IGVuZFkpIHtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICByZXR1cm4gW3BhdGhbMF0sIHBhdGhbcGF0aC5sZW5ndGgtMV1dO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9