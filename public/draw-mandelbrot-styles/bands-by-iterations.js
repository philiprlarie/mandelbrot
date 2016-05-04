// bands by number of pixels. Linear gradient by total number of iterations
function drawMandelbrot (mandelbrot, canvas, opts) {
  var i, j;

  console.log('Drawing Mandelbrot...');
  var t1 = new Date();

  var width = mandelbrot.width;
  var height = mandelbrot.height;
  var numPixels = width * height;
  var iterations = mandelbrot.iterations;
  var escapeVals = [].concat.apply([], mandelbrot.grid);

  // create histogram of escape values. a value of Infinity -> iterations
  var escapeHistogram = Array.apply(null, Array(iterations + 1)).map(Number.prototype.valueOf, 0);
  i = 0;
  var escapeVal;
  while (i < escapeVals.length) {
    escapeVal = escapeVals[i] === Infinity ? iterations : escapeVals[i];
    escapeHistogram[escapeVal] += 1;
    i++;
  }
  console.log(escapeHistogram);

  // find indecies on escapeHistogram that correspond to split points
  var bandSplitIndecies = new Array(opts.bandSplitPercents.length);
  i = 0;
  var total = 0;
  var index = 0;
  while (i < bandSplitIndecies.length) {
    while (total / numPixels <= opts.bandSplitPercents[i] && index < escapeHistogram.length) {
      total += escapeHistogram[index];
      index++;
    }
    bandSplitIndecies[i] = index - 1;
    i++;
  }
  bandSplitIndecies.unshift(0);
  bandSplitIndecies.push(escapeHistogram.length);

  // create color percent tables (each escape value corresponds to a percentage of color change based on its position in its respective band)
  // bandSplitPercent = [.10, .50, .80];
  // escapeHistogram = [5, 5, 10, 50, 10, 10, 10];
  // bandSplitIndecies  *     *       *   *      *
  var percentColorTable = new Array(escapeHistogram.length);
  var totalIterationsInBand;
  var iterationsInBandSoFar;
  var bandStartIndex = 0;
  while (bandStartIndex < bandSplitIndecies.length - 1) {
  // for every band do the following
    totalIterationsInBand = 0;
    i = bandSplitIndecies[bandStartIndex];
    while (i < bandSplitIndecies[bandStartIndex + 1]) {
      totalIterationsInBand += escapeHistogram[i] * i;
      i++;
    }
    iterationsInBandSoFar = 0;
    i = bandSplitIndecies[bandStartIndex];
    while (i < bandSplitIndecies[bandStartIndex + 1]) {
      percentColorTable[i] = iterationsInBandSoFar / totalIterationsInBand;
      iterationsInBandSoFar += escapeHistogram[i] * i;
      i++;
    }
    bandStartIndex++;
  }

  // create table that relates iteration value to RGBA value
  var colorTable = new Array(escapeHistogram.length);
  var startR, startG, startB, startA, endR, endG, endB, endA, delR, delG, delB, delA, currentRGBA;
  var bandStartIndex = 0; // jshint ignore:line
  while (bandStartIndex < bandSplitIndecies.length - 1) {
  // for every band do the following
    startR = opts.startColors[bandStartIndex][0];
    startG = opts.startColors[bandStartIndex][1];
    startB = opts.startColors[bandStartIndex][2];
    startA = opts.startColors[bandStartIndex][3];
    endR = opts.endColors[bandStartIndex][0];
    endG = opts.endColors[bandStartIndex][1];
    endB = opts.endColors[bandStartIndex][2];
    endA = opts.endColors[bandStartIndex][3];
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
      escapeNum = mandelbrot.grid[j][i];
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
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}
