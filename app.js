var express = require('express');
var app = express();
var parseUrlEncoded = require('body-parser').urlencoded({ extended: false });
var Mandelbrot = require('./mandelbrot.js');

app.use(express.static('public'));

app.post('/api/mandelbrot', parseUrlEncoded, function (req, res) {
  // TODO: Form validator
  var input = req.body;
  var returnMandelbrot = new Mandelbrot(
    parseFloat(input.centerX),
    parseFloat(input.centerY),
    parseInt(input.width),
    parseInt(input.height),
    parseFloat(input.zoom),
    parseInt(input.iterations)
  );
  res.json(returnMandelbrot);
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

module.exports = {};
