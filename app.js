var express = require('express');
var parseUrlEncoded = require('body-parser').urlencoded({ extended: false });
var Mandelbrot = require('./mandelbrot.js');

var app = express();


app.use(express.static('public'));

app.post('/api/mandelbrot', parseUrlEncoded, function (req, res) {
  // TODO: Form validator
  var input = req.body;
  res.json(new Mandelbrot(
    input.centerX,
    input.centerY,
    input.width,
    input.height,
    input.zoom,
    input.iterations
  ));
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
module.exports = {};
