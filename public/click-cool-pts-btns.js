$('button[name=cool-pt-1]').click(function (e) {
  e.preventDefault();
  $('#mandelbrot-input input[name=centerx]').val(-0.761574);
  $('#mandelbrot-input input[name=centery]').val(-0.0847596);
  $('#mandelbrot-input input[name=zoom]').val(3000);
  $('#mandelbrot-input input[name=iterations]').val(500);
  $('#mandelbrot-input').submit();
});

module.exports = {};
