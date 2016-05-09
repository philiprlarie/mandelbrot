// // bands by number of pixels. Linear gradient by number of pixel
function drawMandelbrot (mandelbrot, canvas, opts) {
  var i, j;



  var width = mandelbrot.width;
  var height = mandelbrot.height;
  var numPixels = width * height;
  var iterations = mandelbrot.iterations;
  var escapeVals = [].concat.apply([], mandelbrot.escapeValsGrid);
  var numBands = opts.numBands;
  var startColors = opts.startColors;
  var endColors = opts.endColors;
  var bandSplitPercents = opts.bandSplitPercents;

  // create histogram of escape values. a value of Infinity -> iterations
  var escapeHistogram = Array.apply(null, Array(iterations + 1)).map(Number.prototype.valueOf, 0); // initialize array of 0s
  i = 0;
  var escapeVal;
  while (i < escapeVals.length) {
    escapeVal = escapeVals[i] === Infinity ? iterations : escapeVals[i];
    escapeHistogram[escapeVal] += 1;
    i++;
  }

  // find indecies on escapeHistogram that correspond to split points
  var bandSplitIndecies = new Array(numBands + 1);
  bandSplitIndecies[0] = 0;
  bandSplitIndecies[numBands] = escapeHistogram.length;
  var total = 0;
  var index = 0;
  i = 1;
  while (i < numBands) {
    while (total / numPixels <= bandSplitPercents[i - 1] / 100 && index < escapeHistogram.length) {
      total += escapeHistogram[index];
      index++;
    }
    bandSplitIndecies[i] = index;
    i++;
  }

  // create color percent tables (each escape value corresponds to a percentage of color change based on its position in its respective band)
  // bandSplitPercent = [.10, .50, .80];
  // escapeHistogram = [5, 5, 10, 50, 10, 10, 10];
  // bandSplitIndecies  *     *       *   *      *
  var percentColorTable = new Array(escapeHistogram.length);
  var totalPixelsInBand;
  var pixelsInBandSoFar;
  var bandStartIndex = 0;
  while (bandStartIndex < numBands) {
  // for every band do the following
    totalPixelsInBand = 0;
    i = bandSplitIndecies[bandStartIndex];
    while (i < bandSplitIndecies[bandStartIndex + 1]) {
      totalPixelsInBand += escapeHistogram[i];
      i++;
    }
    pixelsInBandSoFar = 0;
    i = bandSplitIndecies[bandStartIndex];
    while (i < bandSplitIndecies[bandStartIndex + 1]) {
      percentColorTable[i] = pixelsInBandSoFar / totalPixelsInBand;
      pixelsInBandSoFar += escapeHistogram[i];
      i++;
    }
    bandStartIndex++;
  }

  // create table that relates iteration value to RGBA value
  var colorTable = new Array(escapeHistogram.length);
  var startR, startG, startB, startA, endR, endG, endB, endA, delR, delG, delB, delA, currentRGBA;
  var bandStartIndex = 0; // jshint ignore:line
  while (bandStartIndex < numBands) {
  // for every band do the following
    startR = startColors[bandStartIndex][0];
    startG = startColors[bandStartIndex][1];
    startB = startColors[bandStartIndex][2];
    startA = startColors[bandStartIndex][3];
    endR = endColors[bandStartIndex][0];
    endG = endColors[bandStartIndex][1];
    endB = endColors[bandStartIndex][2];
    endA = endColors[bandStartIndex][3];
    delR = endR - startR;
    delG = endG - startG;
    delB = endB - startB;
    delA = endA - startA;
    i = bandSplitIndecies[bandStartIndex];
    while (i < bandSplitIndecies[bandStartIndex + 1]) {
      currentRGBA = [];
      currentRGBA[0] = startR + delR * percentColorTable[i];
      currentRGBA[1] = startG + delG * percentColorTable[i];
      currentRGBA[2] = startB + delB * percentColorTable[i];
      currentRGBA[3] = startA + delA * percentColorTable[i];
      colorTable[i] = currentRGBA;
      i++;
    }
    bandStartIndex++;
  }

  // set pixels to have correct colors based on escape value and color table
  var ctx = canvas.getContext('2d');
  var id = ctx.createImageData(width, height);
  var d = id.data;
  var escapeNum, pixelNum;
  i = 0;
  while (i < width) {
    j = 0;
    while (j < height) {
      pixelNum = i + width * j;
      escapeNum = mandelbrot.escapeValsGrid[j][i];
      escapeNum = escapeNum === Infinity ? iterations : escapeNum;
      d[4 * pixelNum + 0] = colorTable[escapeNum][0];
      d[4 * pixelNum + 1] = colorTable[escapeNum][1];
      d[4 * pixelNum + 2] = colorTable[escapeNum][2];
      d[4 * pixelNum + 3] = colorTable[escapeNum][3];
      j++;
    }
    i++;
  }

  ctx.putImageData(id, 0, 0);
}

module.exports = drawMandelbrot;
