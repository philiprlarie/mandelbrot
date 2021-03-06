var $ = require('jquery');

$('#canvas').click(function (e) {
  e.preventDefault();
  if (!window.mandelbrot) {
    return;
  }
  var xClickCoord = e.offsetX;
  var yClickCoord = e.offsetY;
  var unitCoords = window.mandelbrot.coordGrid[yClickCoord][xClickCoord];
  $('#mandelbrot-input input[name=centerX]').val(unitCoords[0]);
  $('#mandelbrot-input input[name=centerY]').val(unitCoords[1]);
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
