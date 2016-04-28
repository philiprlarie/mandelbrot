$('button[name=cool-pt-1]').click(function (e) {
  e.preventDefault();
  $('#mandelbrot-input input[name=centerx]').val(-0.761574);
  $('#mandelbrot-input input[name=centery]').val(-0.0847596);
  $('#mandelbrot-input input[name=zoom]').val(3000);
  $('#mandelbrot-input input[name=iterations]').val(500);
  $('#mandelbrot-input').submit();
});

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
