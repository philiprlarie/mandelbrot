(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// The purpose of this function is to output a grid that corresponds to the number of iterations needed in the mandlebrot function for a points magitude to reach > 2
function Mandelbrot (centerX, centerY, width, height, zoom, iterations) {
  this.centerX = centerX; // real number coordinate for center of zoom
  this.centerY = centerY; // imaginary number component for center of zoom
  this.width = width; // width in pixels of output picture
  this.height = height; // height in pixels of output picture
  this.zoom = zoom || 1; // default zoom corresponds to 4 units on x axis
  this.iterations = iterations; // max iterations of mandelbrot function

  this.coordGrid = new Array(this.height); // grid of coordinates
  var i = 0;
  while (i < this.height) {
    this.coordGrid[i] = new Array(this.width);
    i++;
  }

  this.grid = new Array(this.height); // grid of mandelbrot escape values
  i = 0;
  while (i < this.height) {
    this.grid[i] = new Array(this.width);
    i++;
  }

  setPointValues(this); // set each spot on grid as 2d point coordinates
  setMandelbrotValues(this); // set each spot on grid as mandelbrot escape count
}

// set each spot on grid as 2d point coordinates
var setPointValues = function (mandelbrot) {
  var UNIT_PIXEL_SCALING = mandelbrot.width / 4; // for zoom of one, x-axis has length 4 units
  var i = 0, j, real, imaginary;

  while (i < mandelbrot.width) {
    j = 0;
    real = mandelbrot.centerX + (i - mandelbrot.width / 2) / mandelbrot.zoom / UNIT_PIXEL_SCALING;
    while (j < mandelbrot.height) {
      imaginary = mandelbrot.centerY + (j - mandelbrot.height / 2) / mandelbrot.zoom / UNIT_PIXEL_SCALING;
      mandelbrot.coordGrid[j][i] = [real, imaginary];
      j++;
    }
    i++;
  }
};

// set each spot on grid as mandelbrot escape count
var setMandelbrotValues = function (mandelbrot) {
  var i, j;

  i = 0;
  while (i < mandelbrot.width) {
    j = 0;
    while (j < mandelbrot.height) {
      mandelbrot.grid[j][i] = mandelbrotIterate(mandelbrot.coordGrid[j][i], mandelbrot.iterations);
      j++;
    }
    i++;
  }
};

// Given a point, iterate the mandelbrot function until point has magnitude > 2 or max iterations. If we meet max itarations, assume point will never escape

// simple escape calculation
// var mandelbrotIterate = function (point, maxIterations) {
//   var escapeRadius = 2;
//   var startReal = point[0];
//   var startImaginary = point[1];
//   var real = 0;
//   var imaginary = 0;
//
//   var i = 0;
//   while (i < maxIterations) {
//     tempReal = startReal + real * real - imaginary * imaginary;
//     tempImaginary = startImaginary + 2 * real * imaginary;
//     real = tempReal;
//     imaginary = tempImaginary;
//
//     if (real * real + imaginary * imaginary > escapeRadius * escapeRadius) {
//       return i;
//     }
//     i++;
//   }
//   return Infinity;
// };

// smooth escape calculation
var mandelbrotIterate = function (point, maxIterations) {
  var escapeRadius = 20000;
  var startReal = point[0];
  var startImaginary = point[1];
  var real = 0;
  var imaginary = 0;

  var tempReal, tempImaginary;
  var i = 0;
  while (i < maxIterations) {
    tempReal = startReal + real * real - imaginary * imaginary;
    tempImaginary = startImaginary + 2 * real * imaginary;
    real = tempReal;
    imaginary = tempImaginary;

    if (real * real + imaginary * imaginary > escapeRadius * escapeRadius) {
      break;
    }
    i++;
  }

  if (real * real + imaginary * imaginary < 2 * 2 * 2 * 2) { return 0; }
  var mu = (i - Math.log(Math.log(real * real + imaginary * imaginary) / 2) / Math.log(2)) / maxIterations;
  return Math.sqrt(mu);
};

module.exports = Mandelbrot;

},{}],2:[function(require,module,exports){
$('button[name=cool-pt-1]').click(function (e) {
  e.preventDefault();
  $('#mandelbrot-input input[name=centerx]').val(-0.761574);
  $('#mandelbrot-input input[name=centery]').val(-0.0847596);
  $('#mandelbrot-input input[name=zoom]').val(3000);
  $('#mandelbrot-input input[name=iterations]').val(500);
  $('#mandelbrot-input').submit();
});

module.exports = {};

},{}],3:[function(require,module,exports){
$('#canvas').click(function (e) {
  e.preventDefault();
  var xClickCoord = e.offsetX;
  var yClickCoord = e.offsetY;
  var unitCoords = window.mandelbrot.coordGrid[yClickCoord][xClickCoord];
  $('#mandelbrot-input input[name=centerx]').val(unitCoords[0]);
  $('#mandelbrot-input input[name=centery]').val(unitCoords[1]);
  var oldZoom;
  if (e.shiftKey) {
    oldZoom = parseFloat($('#mandelbrot-input input[name=zoom]').val());
    $('#mandelbrot-input input[name=zoom]').val(oldZoom * 2);
  } else if (e.altKey) {
    oldZoom = parseFloat($('#mandelbrot-input input[name=zoom]').val());
    $('#mandelbrot-input input[name=zoom]').val(oldZoom / 2);
  }
  $('#mandelbrot-input').submit();
});

module.exports = {};

},{}],4:[function(require,module,exports){
$(function () {
  require('./click-cool-pts-btns.js');
  require('./click-mandelbrot.js');
  require('./draw-mandelbrot.js');
  require('./submit-mandelbrot-form.js');
});

},{"./click-cool-pts-btns.js":2,"./click-mandelbrot.js":3,"./draw-mandelbrot.js":7,"./submit-mandelbrot-form.js":8}],5:[function(require,module,exports){
// black on white based on linear gradient of escape num
function drawMandelbrot (mandelbrot, canvas, opts) {
  console.log('Drawing Mandelbrot...');
  var t1 = new Date();

  var width = mandelbrot.width;
  var height = mandelbrot.height;
  var ctx = canvas.getContext('2d');
  var id = ctx.createImageData(width, height);
  var d = id.data;

  var i = 0, j, pixelNum, escapeNum;
  while (i < width) {
    j = 0;
    while (j < height) {
      escapeNum = mandelbrot.grid[j][i];
      pixelNum = i + j * width;

      d[4 * pixelNum + 0] = 0;
      d[4 * pixelNum + 1] = 0;
      d[4 * pixelNum + 2] = 0;
      d[4 * pixelNum + 3] = 255 * escapeNum;
      j++;
    }
    i++;
  }

  ctx.putImageData(id, 0, 0);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}

module.exports = drawMandelbrot;

},{}],6:[function(require,module,exports){
// white on black based on linear gradient of escape num
function drawMandelbrot (mandelbrot, canvas, opts) {
  console.log('Drawing Mandelbrot...');
  var t1 = new Date();

  var width = mandelbrot.width;
  var height = mandelbrot.height;
  var ctx = canvas.getContext('2d');
  var id = ctx.createImageData(width, height);
  var d = id.data;

  var i = 0, j, pixelNum, escapeNum;
  while (i < width) {
    j = 0;
    while (j < height) {
      escapeNum = mandelbrot.grid[j][i];
      pixelNum = i + j * width;

      d[4 * pixelNum + 0] = 0;
      d[4 * pixelNum + 1] = 0;
      d[4 * pixelNum + 2] = 0;
      d[4 * pixelNum + 3] = 255 - 255 * escapeNum;
      j++;
    }
    i++;
  }

  ctx.putImageData(id, 0, 0);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}

module.exports = drawMandelbrot;

},{}],7:[function(require,module,exports){
var Mandelbrot = require('../mandelbrot.js');

var whiteOnBlack = require('./draw-mandelbrot-styles/white-on-black.js');
var blackOnWhite = require('./draw-mandelbrot-styles/black-on-white.js');

$('#mandelbrot-input').submit(function (e) {
  e.preventDefault();
  var canvas = document.getElementById('canvas');

  var x = parseFloat($('#mandelbrot-input input[name=centerX]').val());
  var y = parseFloat($('#mandelbrot-input input[name=centerY]').val());
  var zoom = parseFloat($('#mandelbrot-input input[name=zoom]').val());
  var iters = parseInt($('#mandelbrot-input input[name=iterations]').val());
  var width = canvas.width = parseInt($('#mandelbrot-input input[name=width]').val());
  var height = canvas.height = parseInt($('#mandelbrot-input input[name=height]').val());


  opts = {};
  console.log('Calculating Mandelbrot...');
  var t1 = new Date();
  window.mandelbrot = new Mandelbrot(x, y, width, height, zoom, iters);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');

  whiteOnBlack(window.mandelbrot, canvas, opts);
});

// // test options
// var bandSplitPercents = $.map($('#drawing-options input[name=bandSplitPercents]').val().split(' '), parseFloat);
// var opts = {
//   bandTypes: 'percentage',
//   numBands: 5,
//   bandSplitPercents: bandSplitPercents,
//   startColors: [
//     [0, 0, 0, 255],
//     [255, 0, 0, 255],
//     [0, 255, 0, 255],
//     [0, 0, 255, 255],
//     [255, 255, 0, 255]
//   ],
//   endColors: [
//     [255, 0, 0, 255],
//     [0, 255, 0, 255],
//     [0, 0, 255, 255],
//     [255, 255, 0, 255],
//     [255, 0, 255, 255]
//   ],
// };
// end test options

module.exports = {};

},{"../mandelbrot.js":1,"./draw-mandelbrot-styles/black-on-white.js":5,"./draw-mandelbrot-styles/white-on-black.js":6}],8:[function(require,module,exports){
$('#mandelbrot-input').on('submit', function (event) {
  event.preventDefault();
  var $form = $(this);
  var inputData = $form.serialize();

  $.ajax({
    type: 'POST',
    url: '/api/mandelbrot',
    data: inputData,
    success: mandelbrotInputSuccessHandler,
    error: mandelbrotInputErrorHandler
  });
});

function mandelbrotInputSuccessHandler (data) {
  window.mandelbrot = data;
}

function mandelbrotInputErrorHandler (error) {
  console.log(error);
}

module.exports = {};

},{}]},{},[4]);
