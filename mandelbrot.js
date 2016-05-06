// The purpose of this function is to output a grid that corresponds to the number of iterations needed in the mandlebrot function for a points magitude to reach > 2
function Mandelbrot (centerX, centerY, width, height, zoom, iterations) {
  this.centerX = centerX; // real number coordinate for center of zoom
  this.centerY = centerY; // imaginary number component for center of zoom
  this.width = width; // width in pixels of output picture
  this.height = height; // height in pixels of output picture
  this.zoom = zoom || 1; // default zoom corresponds to 4 units on x axis
  this.iterations = iterations; // max iterations of mandelbrot function

  this.coordGrid = new Array(this.height); // grid of coordinates
  var i = 0;
  while (i < this.height) {
    this.coordGrid[i] = new Array(this.width);
    i++;
  }

  // grids of mandelbrot escape values
  this.escapeValsGrid = new Array(this.height); // integers
  this.smoothEscapeValsGrid = new Array(this.height); // floats
  i = 0;
  while (i < this.height) {
    this.escapeValsGrid[i] = new Array(this.width);
    this.smoothEscapeValsGrid[i] = new Array(this.width);
    i++;
  }

  setPointValues(this); // set each spot on grid as 2d point coordinates
  setMandelbrotValues(this); // set each spot on grid as mandelbrot escape count
}

// set each spot on grid as 2d point coordinates
var setPointValues = function (mandelbrot) {
  var UNIT_PIXEL_SCALING = mandelbrot.width / 4; // for zoom of one, x-axis has length 4 units
  var i = 0, j, real, imaginary;

  while (i < mandelbrot.width) {
    j = 0;
    real = mandelbrot.centerX + (i - mandelbrot.width / 2) / mandelbrot.zoom / UNIT_PIXEL_SCALING;
    while (j < mandelbrot.height) {
      imaginary = mandelbrot.centerY + (j - mandelbrot.height / 2) / mandelbrot.zoom / UNIT_PIXEL_SCALING;
      mandelbrot.coordGrid[j][i] = [real, imaginary];
      j++;
    }
    i++;
  }
};

// set each spot on grid as mandelbrot escape count
var setMandelbrotValues = function (mandelbrot) {
  var i, j, escapeVals;

  i = 0;
  while (i < mandelbrot.width) {
    j = 0;
    while (j < mandelbrot.height) {
      escapeVals = mandelbrotIterate(mandelbrot.coordGrid[j][i], mandelbrot.iterations);
      mandelbrot.escapeValsGrid[j][i] = escapeVals[0];
      mandelbrot.smoothEscapeValsGrid[j][i] = escapeVals[1];
      j++;
    }
    i++;
  }
};

// Given a point, iterate the mandelbrot function until point has magnitude > 2 or max iterations. If we meet max itarations, assume point will never escape
// smooth escape calculation
var mandelbrotIterate = function (point, maxIterations) {
  var escapeVals = [-1, -1];
  var escapeRadius = 2;
  var largeEscapeRadius = 20000;
  var startReal = point[0];
  var startImaginary = point[1];
  var real = 0;
  var imaginary = 0;

  var tempReal, tempImaginary;
  var i = 0;
  while (i < maxIterations) {
    // discrete escapeVal
    if (escapeVals[0] < 0 && real * real + imaginary * imaginary > escapeRadius * escapeRadius) {
      escapeVals[0] = i;
    }
    // continuous escapeVal
    if (real * real + imaginary * imaginary > largeEscapeRadius * largeEscapeRadius) {
      break;
    }
    // both
    tempReal = startReal + real * real - imaginary * imaginary;
    tempImaginary = startImaginary + 2 * real * imaginary;
    real = tempReal;
    imaginary = tempImaginary;

    i++;
  }

  // TODO: infinity over json
  // discrete escapeVal
  if (escapeVals[0] < 0) {
    escapeVals[0] = maxIterations;
  }
  //continuous escapeVal
  if (real * real + imaginary * imaginary < 2 * 2 * 2 * 2) {
    escapeVals[1] = maxIterations;
  } else {
    // TODO: check this math
    var mu = (i - Math.log(Math.log(real * real + imaginary * imaginary) / 2) / Math.log(2)) / maxIterations;
    escapeVals[1] = Math.sqrt(mu);
  }

  return escapeVals;
};

module.exports = Mandelbrot;
