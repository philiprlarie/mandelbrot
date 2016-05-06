var $ = require('jquery');
var whiteOnBlack = require('./draw-mandelbrot-styles/white-on-black.js');
var blackOnWhite = require('./draw-mandelbrot-styles/black-on-white.js');
var simpleHistogram = require('./draw-mandelbrot-styles/simple-histogram.js');
var bandsByPixels = require('./draw-mandelbrot-styles/bands-by-pixels.js');
var bandsByIterations = require('./draw-mandelbrot-styles/bands-by-iterations.js');

function drawMandelbrot () {
  var canvas = $('#canvas')[0];

  // opts = {};
  // test options
  var bandSplitPercents = $.map($('#drawing-options input[name=bandSplitPercents]').val().split(' '), parseFloat);
  var opts = {
    bandTypes: 'percentage',
    numBands: 5,
    bandSplitPercents: bandSplitPercents,
    startColors: [
      [0, 0, 0, 255],
      [255, 0, 0, 255],
      [0, 255, 0, 255],
      [0, 0, 255, 255],
      [255, 255, 0, 255]
    ],
    endColors: [
      [255, 0, 0, 255],
      [0, 255, 0, 255],
      [0, 0, 255, 255],
      [255, 255, 0, 255],
      [255, 0, 255, 255]
    ],
  };
  // end test options
  // blackOnWhite(window.mandelbrot, canvas, opts);
  // whiteOnBlack(window.mandelbrot, canvas, opts);
  // simpleHistogram(window.mandelbrot, canvas, opts);
  // bandsByPixels(window.mandelbrot, canvas, opts);
  bandsByIterations(window.mandelbrot, canvas, opts);
}


module.exports = drawMandelbrot;
