(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

module.exports = {someshit: 'this is'};

},{}],2:[function(require,module,exports){
var someshit = require('./click-mandelbrot.js');

$(function () {
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
  }

  function mandelbrotInputErrorHandler (error) {
    console.log(error);
  }


});

},{"./click-mandelbrot.js":1}]},{},[2]);
