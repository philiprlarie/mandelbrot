var $ = require('jquery');
var drawMandelbrot = require('./draw-mandelbrot.js');

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
  $('#drawing-options').submit();
}

function mandelbrotInputErrorHandler (error) {
  console.log(error);
}

module.exports = {};
