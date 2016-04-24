var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var id = ctx.createImageData(1, 1);
var d = id.data;
d[0] = 0;
d[1] = 0;
d[2] = 255;
d[3] = 255;

$('#mandelbrot-input').submit(function (e) {
  e.preventDefault();
  var x = parseFloat($('#mandelbrot-input input[name=centerx]').val());
  var y = parseFloat($('#mandelbrot-input input[name=centery]').val());
  var zoom = parseFloat($('#mandelbrot-input input[name=zoom]').val());
  var iters = parseInt($('#mandelbrot-input input[name=iterations]').val());
  var width = canvas.width = parseInt($('#mandelbrot-input input[name=canvas-width]').val());
  var height = canvas.height = parseInt($('#mandelbrot-input input[name=canvas-height]').val());
  var sharpness = parseFloat($('#mandelbrot-input input[name=sharpness]').val());

  console.log('Calculating Mandelbrot...');
  var t1 = new Date();
  var mandelbrot = new window.Mandelbrot(x, y, width, height, zoom, iters);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');

  console.log('Drawing Mandelbrot...');
  t1 = new Date();
  var i = 0, j;
  while (i < mandelbrot.width) {
    j = 0;
    while (j < mandelbrot.height) {
      d[0] = 255 - 255 * mandelbrot.grid[j][i] / iters;
      ctx.putImageData(id, i, j);
      j++;
    }
    i++;
  }
  t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
});

$('button[name=cool-pt-1]').click(function () {
  $('#mandelbrot-input input[name=centerx]').val(-0.761574);
  $('#mandelbrot-input input[name=centery]').val(-0.0847596);
  $('#mandelbrot-input input[name=zoom]').val(3000);
  $('#mandelbrot-input input[name=iterations]').val(500);
  $('#mandelbrot-input').submit();
});
