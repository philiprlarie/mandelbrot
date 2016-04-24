window.Mandelbrot = Mandelbrot;

// The purpose of this function is to output a grid that corresponds to the number of iterations needed in the mandlebrot function for a points magitude to reach > 2
function Mandelbrot (centerX, centerY, width, height, zoom, iterations) {
  this.centerX = centerX; // real number coordinate for center of zoom
  this.centerY = centerY; // imaginary number component for center of zoom
  this.width = width; // width in pixels of output picture
  this.height = height; // height in pixels of output picture
  this.zoom = zoom || 1; // default zoom corresponds to 1000px per unit
  this.iterations = iterations; // max iterations of mandelbrot function

  this.grid = new Array(this.height); // create grid with spot for each pixel
  var i = 0;
  while (i < this.height) {
    this.grid[i] = new Array(this.width);
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
      mandelbrot.grid[j][i] = [real, imaginary];
      j++;
    }
    i++;
  }
};

// set each spot on grid as mandelbrot escape count
var setMandelbrotValues = function (mandelbrot) {
  var i, j;

  i = 0;
  while (i < mandelbrot.width) {
    j = 0;
    while (j < mandelbrot.height) {
      mandelbrot.grid[j][i] = mandelbrotIterate(mandelbrot.grid[j][i], mandelbrot.iterations);
      j++;
    }
    i++;
  }
};

// Given a point, iterate the mandelbrot function until point has magnitude > 2 or max iterations. If we meet max itarations, assume point will never escape
var mandelbrotIterate = function (point, maxIterations) {
  var startReal = point[0];
  var startImaginary = point[1];
  var real = 0;
  var imaginary = 0;

  var i = 0;
  while (i <= maxIterations) {
    newReal = startReal + real * real - imaginary * imaginary;
    newImaginary = startImaginary + 2 * real * imaginary;
    real = newReal;
    imaginary = newImaginary;

    if (real * real + imaginary * imaginary > 4) {
      return i;
    } else {
    }
    i++;
  }
  return Infinity;
};
