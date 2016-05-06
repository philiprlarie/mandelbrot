var $ = require('jquery');

$('button[name=cool-pt-1]').click(function (e) {
  e.preventDefault();
  $('#mandelbrot-input input[name=centerX]').val(-0.761574);
  $('#mandelbrot-input input[name=centerY]').val(-0.0847596);
  $('#mandelbrot-input input[name=zoom]').val(3000);
  $('#mandelbrot-input input[name=iterations]').val(500);
  $('#mandelbrot-input').submit();
});

module.exports = {};
