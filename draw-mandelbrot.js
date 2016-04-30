$('#mandelbrot-input').submit(function (e) {
  e.preventDefault();
  var canvas = document.getElementById('canvas');

  var x = parseFloat($('#mandelbrot-input input[name=centerx]').val());
  var y = parseFloat($('#mandelbrot-input input[name=centery]').val());
  var zoom = parseFloat($('#mandelbrot-input input[name=zoom]').val());
  var iters = parseInt($('#mandelbrot-input input[name=iterations]').val());
  var width = canvas.width = parseInt($('#mandelbrot-input input[name=canvas-width]').val());
  var height = canvas.height = parseInt($('#mandelbrot-input input[name=canvas-height]').val());
  var sharpness = parseFloat($('#mandelbrot-input input[name=sharpness]').val());

  // test options
  var bandSplitPercents = $.map($('#mandelbrot-input input[name=bandSplitPercents]').val().split(' '), parseFloat);
  var opts = {
    bandTypes: 'percentage',
    numBands: 5,
    bandSplitPercents: bandSplitPercents,
    startColors: [
      [0, 0, 0, 255],
      [255, 0, 0, 255],
      [0, 255, 0, 255],
      [0, 0, 255, 255],
      [255, 255, 0, 255]
    ],
    endColors: [
      [255, 0, 0, 255],
      [0, 255, 0, 255],
      [0, 0, 255, 255],
      [255, 255, 0, 255],
      [255, 0, 255, 255]
    ],
  };
  // end test options
  opts.sharpness = sharpness;

  console.log('Calculating Mandelbrot...');
  var t1 = new Date();
  window.mandelbrot = new window.Mandelbrot(x, y, width, height, zoom, iters);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');

  drawMandelbrot(window.mandelbrot, canvas, opts);
});

// white on black
// d[4 * pixelNum + 0] = 0;
// d[4 * pixelNum + 1] = 0;
// d[4 * pixelNum + 2] = 0;
// d[4 * pixelNum + 3] = 255 - 255 * mandelbrot.grid[j][i] / mandelbrot.iterations;

// black on white
// d[4 * pixelNum + 0] = 0;
// d[4 * pixelNum + 1] = 0;
// d[4 * pixelNum + 2] = 0;
// d[4 * pixelNum + 3] = 255 - 255 * mandelbrot.grid[j][i] / mandelbrot.iterations;

// scaling with 256 bins
// var escapeVals = [].concat.apply([], mandelbrot.grid);
// escapeVals.sort(function (a, b) { return a - b; });
// colorVals = new Array(256);
// var k = 0, idx;
// while (k < 256) {
//   idx = Math.floor(width * height / 256 * k);
//   colorVals[k] = escapeVals[idx];
//   k++;
// }
//
// var i = 0, j, pixelNum, escapeNum;
// while (i < width) {
//   j = 0;
//   while (j < height) {
//     escapeNum = mandelbrot.grid[j][i];
//     pixelNum = i + j * width;
//     d[4 * pixelNum + 0] = 0;
//     d[4 * pixelNum + 1] = 0;
//     d[4 * pixelNum + 2] = 0;
//
//     k = 0;
//     while (k < 256) {
//       if (colorVals[k] < escapeNum ) {
//         k++;
//       } else {
//         break;
//       }
//     }
//     d[4 * pixelNum + 3] = k;
//
//     j++;
//   }
//   i++;
// }

// linear black white gradient based on pixel number
// function drawMandelbrot (mandelbrot, canvas, opts) {
//   console.log('Drawing Mandelbrot...');
//   var t1 = new Date();
//
//   var width = mandelbrot.width;
//   var height = mandelbrot.height;
//   var ctx = canvas.getContext('2d');
//   var id = ctx.createImageData(width, height);
//   var d = id.data;
//
//   var escapeVals = [].concat.apply([], mandelbrot.grid);
//   escapeVals.sort(function (a, b) { return a - b; });
//   colorVals = new Array(256);
//   var k = 0, idx;
//   while (k < 256) {
//     idx = Math.floor(width * height / 256 * k);
//     colorVals[k] = escapeVals[idx];
//     k++;
//   }
//
//   var i = 0, j, pixelNum, escapeNum;
//   while (i < width) {
//     j = 0;
//     while (j < height) {
//       escapeNum = mandelbrot.grid[j][i];
//       pixelNum = i + j * width;
//       d[4 * pixelNum + 0] = 0;
//       d[4 * pixelNum + 1] = 0;
//       d[4 * pixelNum + 2] = 0;
//
//       k = 0;
//       while (k < 256) {
//         if (colorVals[k] < escapeNum ) {
//           k++;
//         } else {
//           break;
//         }
//       }
//       d[4 * pixelNum + 3] = k;
//
//       j++;
//     }
//     i++;
//   }
//
//   ctx.putImageData(id, 0, 0);
//   var t2 = new Date();
//   console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
// }


// white on black based on linear gradient of escape num
function drawMandelbrot (mandelbrot, canvas, opts) {
  console.log('Drawing Mandelbrot...');
  var t1 = new Date();

  var width = mandelbrot.width;
  var height = mandelbrot.height;
  var ctx = canvas.getContext('2d');
  var id = ctx.createImageData(width, height);
  var d = id.data;

  var i = 0, j, pixelNum, escapeNum;
  while (i < width) {
    j = 0;
    while (j < height) {
      escapeNum = mandelbrot.grid[j][i];
      pixelNum = i + j * width;

      d[4 * pixelNum + 0] = 0;
      d[4 * pixelNum + 1] = 0;
      d[4 * pixelNum + 2] = 0;
      d[4 * pixelNum + 3] = 255 - 255 * escapeNum;
      j++;
    }
    i++;
  }

  ctx.putImageData(id, 0, 0);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}






// // bands by number of pixels. Linear gradient by total number of iterations
// function drawMandelbrot (mandelbrot, canvas, opts) {
//   var i, j;
//
//   console.log('Drawing Mandelbrot...');
//   var t1 = new Date();
//
//   var width = mandelbrot.width;
//   var height = mandelbrot.height;
//   var numPixels = width * height;
//   var iterations = mandelbrot.iterations;
//   var escapeVals = [].concat.apply([], mandelbrot.grid);
//
//   // create histogram of escape values. a value of Infinity -> iterations
//   var escapeHistogram = Array.apply(null, Array(iterations + 1)).map(Number.prototype.valueOf, 0);
//   i = 0;
//   var escapeVal;
//   while (i < escapeVals.length) {
//     escapeVal = escapeVals[i] === Infinity ? iterations : escapeVals[i];
//     escapeHistogram[escapeVal] += 1;
//     i++;
//   }
//   console.log(escapeHistogram);
//
//   // find indecies on escapeHistogram that correspond to split points
//   var bandSplitIndecies = new Array(opts.bandSplitPercents.length);
//   i = 0;
//   var total = 0;
//   var index = 0;
//   while (i < bandSplitIndecies.length) {
//     while (total / numPixels <= opts.bandSplitPercents[i] && index < escapeHistogram.length) {
//       total += escapeHistogram[index];
//       index++;
//     }
//     bandSplitIndecies[i] = index - 1;
//     i++;
//   }
//   bandSplitIndecies.unshift(0);
//   bandSplitIndecies.push(escapeHistogram.length);
//
//   // create color percent tables (each escape value corresponds to a percentage of color change based on its position in its respective band)
//   // bandSplitPercent = [.10, .50, .80];
//   // escapeHistogram = [5, 5, 10, 50, 10, 10, 10];
//   // bandSplitIndecies  *     *       *   *      *
//   var percentColorTable = new Array(escapeHistogram.length);
//   var totalIterationsInBand;
//   var iterationsInBandSoFar;
//   var bandStartIndex = 0;
//   while (bandStartIndex < bandSplitIndecies.length - 1) {
//   // for every band do the following
//     totalIterationsInBand = 0;
//     i = bandSplitIndecies[bandStartIndex];
//     while (i < bandSplitIndecies[bandStartIndex + 1]) {
//       totalIterationsInBand += escapeHistogram[i] * i;
//       i++;
//     }
//     iterationsInBandSoFar = 0;
//     i = bandSplitIndecies[bandStartIndex];
//     while (i < bandSplitIndecies[bandStartIndex + 1]) {
//       percentColorTable[i] = iterationsInBandSoFar / totalIterationsInBand;
//       iterationsInBandSoFar += escapeHistogram[i] * i;
//       i++;
//     }
//     bandStartIndex++;
//   }
//
//   // create table that relates iteration value to RGBA value
//   var colorTable = new Array(escapeHistogram.length);
//   var startR, startG, startB, startA, endR, endG, endB, endA, delR, delG, delB, delA, currentRGBA;
//   var bandStartIndex = 0; // jshint ignore:line
//   while (bandStartIndex < bandSplitIndecies.length - 1) {
//   // for every band do the following
//     startR = opts.startColors[bandStartIndex][0];
//     startG = opts.startColors[bandStartIndex][1];
//     startB = opts.startColors[bandStartIndex][2];
//     startA = opts.startColors[bandStartIndex][3];
//     endR = opts.endColors[bandStartIndex][0];
//     endG = opts.endColors[bandStartIndex][1];
//     endB = opts.endColors[bandStartIndex][2];
//     endA = opts.endColors[bandStartIndex][3];
//     delR = endR - startR;
//     delG = endG - startG;
//     delB = endB - startB;
//     delA = endA - startA;
//     i = bandSplitIndecies[bandStartIndex];
//     while (i < bandSplitIndecies[bandStartIndex + 1]) {
//       currentRGBA = [];
//       currentRGBA[0] = startR + delR * percentColorTable[i];
//       currentRGBA[1] = startG + delG * percentColorTable[i];
//       currentRGBA[2] = startB + delB * percentColorTable[i];
//       currentRGBA[3] = startA + delA * percentColorTable[i];
//       colorTable[i] = currentRGBA;
//       i++;
//     }
//     bandStartIndex++;
//   }
//
//   // set pixels to have correct colors based on escape value and color table
//   var ctx = canvas.getContext('2d');
//   var id = ctx.createImageData(width, height);
//   var d = id.data;
//   var escapeNum, pixelNum;
//   i = 0;
//   while (i < width) {
//     j = 0;
//     while (j < height) {
//       pixelNum = i + width * j;
//       escapeNum = mandelbrot.grid[j][i];
//       escapeNum = escapeNum === Infinity ? iterations : escapeNum;
//       d[4 * pixelNum + 0] = colorTable[escapeNum][0];
//       d[4 * pixelNum + 1] = colorTable[escapeNum][1];
//       d[4 * pixelNum + 2] = colorTable[escapeNum][2];
//       d[4 * pixelNum + 3] = colorTable[escapeNum][3];
//       j++;
//     }
//     i++;
//   }
//
//   ctx.putImageData(id, 0, 0);
//   var t2 = new Date();
//   console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
// }




// // bands by number of pixels. Linear gradient by number of pixel
// function drawMandelbrot (mandelbrot, canvas, opts) {
//   var i, j;
//
//   console.log('Drawing Mandelbrot...');
//   var t1 = new Date();
//
//   var width = mandelbrot.width;
//   var height = mandelbrot.height;
//   var numPixels = width * height;
//   var iterations = mandelbrot.iterations;
//   var escapeVals = [].concat.apply([], mandelbrot.grid);
//
//   // create histogram of escape values. a value of Infinity -> iterations
//   var escapeHistogram = Array.apply(null, Array(iterations + 1)).map(Number.prototype.valueOf, 0);
//   i = 0;
//   var escapeVal;
//   while (i < escapeVals.length) {
//     escapeVal = escapeVals[i] === Infinity ? iterations : escapeVals[i];
//     escapeHistogram[escapeVal] += 1;
//     i++;
//   }
//
//   // find indecies on escapeHistogram that correspond to split points
//   var bandSplitIndecies = new Array(opts.bandSplitPercents.length);
//   i = 0;
//   var total = 0;
//   var index = 0;
//   while (i < bandSplitIndecies.length) {
//     while (total / numPixels <= opts.bandSplitPercents[i] && index < escapeHistogram.length) {
//       total += escapeHistogram[index];
//       index++;
//     }
//     bandSplitIndecies[i] = index - 1;
//     i++;
//   }
//   bandSplitIndecies.unshift(0);
//   bandSplitIndecies.push(escapeHistogram.length);
//
//   // create color percent tables (each escape value corresponds to a percentage of color change based on its position in its respective band)
//   // bandSplitPercent = [.10, .50, .80];
//   // escapeHistogram = [5, 5, 10, 50, 10, 10, 10];
//   // bandSplitIndecies  *     *       *   *      *
//   var percentColorTable = new Array(escapeHistogram.length);
//   var totalPixelsInBand;
//   var pixelsInBandSoFar;
//   var bandStartIndex = 0;
//   while (bandStartIndex < bandSplitIndecies.length - 1) {
//   // for every band do the following
//     totalPixelsInBand = 0;
//     i = bandSplitIndecies[bandStartIndex];
//     while (i < bandSplitIndecies[bandStartIndex + 1]) {
//       totalPixelsInBand += escapeHistogram[i];
//       i++;
//     }
//     pixelsInBandSoFar = 0;
//     i = bandSplitIndecies[bandStartIndex];
//     while (i < bandSplitIndecies[bandStartIndex + 1]) {
//       percentColorTable[i] = pixelsInBandSoFar / totalPixelsInBand;
//       pixelsInBandSoFar += escapeHistogram[i];
//       i++;
//     }
//     bandStartIndex++;
//   }
//
//   // create table that relates iteration value to RGBA value
//   var colorTable = new Array(escapeHistogram.length);
//   var startR, startG, startB, startA, endR, endG, endB, endA, delR, delG, delB, delA, currentRGBA;
//   var bandStartIndex = 0; // jshint ignore:line
//   while (bandStartIndex < bandSplitIndecies.length - 1) {
//   // for every band do the following
//     startR = opts.startColors[bandStartIndex][0];
//     startG = opts.startColors[bandStartIndex][1];
//     startB = opts.startColors[bandStartIndex][2];
//     startA = opts.startColors[bandStartIndex][3];
//     endR = opts.endColors[bandStartIndex][0];
//     endG = opts.endColors[bandStartIndex][1];
//     endB = opts.endColors[bandStartIndex][2];
//     endA = opts.endColors[bandStartIndex][3];
//     delR = endR - startR;
//     delG = endG - startG;
//     delB = endB - startB;
//     delA = endA - startA;
//     i = bandSplitIndecies[bandStartIndex];
//     while (i < bandSplitIndecies[bandStartIndex + 1]) {
//       currentRGBA = [];
//       currentRGBA[0] = startR + delR * percentColorTable[i];
//       currentRGBA[1] = startG + delG * percentColorTable[i];
//       currentRGBA[2] = startB + delB * percentColorTable[i];
//       currentRGBA[3] = startA + delA * percentColorTable[i];
//       colorTable[i] = currentRGBA;
//       i++;
//     }
//     bandStartIndex++;
//   }
//
//   // set pixels to have correct colors based on escape value and color table
//   var ctx = canvas.getContext('2d');
//   var id = ctx.createImageData(width, height);
//   var d = id.data;
//   var escapeNum, pixelNum;
//   i = 0;
//   while (i < width) {
//     j = 0;
//     while (j < height) {
//       pixelNum = i + width * j;
//       escapeNum = mandelbrot.grid[j][i];
//       escapeNum = escapeNum === Infinity ? iterations : escapeNum;
//       d[4 * pixelNum + 0] = colorTable[escapeNum][0];
//       d[4 * pixelNum + 1] = colorTable[escapeNum][1];
//       d[4 * pixelNum + 2] = colorTable[escapeNum][2];
//       d[4 * pixelNum + 3] = colorTable[escapeNum][3];
//       j++;
//     }
//     i++;
//   }
//
//   ctx.putImageData(id, 0, 0);
//   var t2 = new Date();
//   console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
// }
