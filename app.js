var express = require('express');
var parseUrlEncoded = require('body-parser').urlencoded({ extended: false });
var Mandelbrot = require('./mandelbrot.js');

var app = express();


app.use(express.static('public'));

app.post('/api/mandelbrot', parseUrlEncoded, function (req, res) {
  var x = 0;
  var y = 0;
  var width = 200;
  var height = 200;
  var zoom = 0.25;
  var iters = 500;
  res.json(new Mandelbrot(x, y, width, height, zoom, iters));
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
module.exports = {};
