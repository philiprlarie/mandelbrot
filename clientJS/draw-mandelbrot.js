var $ = require('jquery');
var whiteOnBlack = require('./draw-mandelbrot-styles/white-on-black.js');
var blackOnWhite = require('./draw-mandelbrot-styles/black-on-white.js');
var smoothBands = require('./draw-mandelbrot-styles/smooth-bands.js');
var simpleHistogram = require('./draw-mandelbrot-styles/simple-histogram.js');
var bandsByPixels = require('./draw-mandelbrot-styles/bands-by-pixels.js');
var bandsByIterations = require('./draw-mandelbrot-styles/bands-by-iterations.js');

function drawMandelbrot (canvas, opts) {
  var mandelbrot = window.mandelbrot;
  canvas.width = mandelbrot.width;
  canvas.height = mandelbrot.height;

  console.log('Drawing Mandelbrot...');
  var t1 = new Date();
  // blackOnWhite(mandelbrot, canvas, opts);
  // whiteOnBlack(mandelbrot, canvas, opts);
  smoothBands(mandelbrot, canvas, opts);
  // simpleHistogram(mandelbrot, canvas, opts);
  // bandsByPixels(mandelbrot, canvas, opts);
  // bandsByPixels(mandelbrot, canvas, opts);


  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}


module.exports = drawMandelbrot;
