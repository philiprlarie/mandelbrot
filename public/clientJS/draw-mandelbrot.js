var $ = require('jquery');
var whiteOnBlack = require('./draw-mandelbrot-styles/white-on-black.js');
var blackOnWhite = require('./draw-mandelbrot-styles/black-on-white.js');

function drawMandelbrot () {
  var canvas = $('#canvas')[0];
  //
  // var x = parseFloat($('#mandelbrot-input input[name=centerX]').val());
  // var y = parseFloat($('#mandelbrot-input input[name=centerY]').val());
  // var zoom = parseFloat($('#mandelbrot-input input[name=zoom]').val());
  // var iters = parseInt($('#mandelbrot-input input[name=iterations]').val());
  // var width = canvas.width = parseInt($('#mandelbrot-input input[name=width]').val());
  // var height = canvas.height = parseInt($('#mandelbrot-input input[name=height]').val());


  opts = {};
  // console.log('Calculating Mandelbrot...');
  // var t1 = new Date();
  // window.mandelbrot = new Mandelbrot(x, y, width, height, zoom, iters);
  // var t2 = new Date();
  // console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');

  whiteOnBlack(window.mandelbrot, canvas, opts);
}

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

module.exports = drawMandelbrot;
