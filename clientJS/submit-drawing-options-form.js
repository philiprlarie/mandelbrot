var $ = require('jquery');
var drawMandelbrot = require('./draw-mandelbrot.js');

$('#drawing-options').on('submit', function (event) {
  event.preventDefault();
  var $form = $(this);

  var numBands = parseInt($form.find('select[name=numBands]').val());
  var bandSplitPercents = $.map($form.find('input[name=bandSplitPercents]').val().split(' '), parseFloat);

  
  var opts = {
    numBands: numBands,
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

    var canvas = $('#canvas')[0];
    drawMandelbrot(canvas, opts);
});

module.exports = {};
