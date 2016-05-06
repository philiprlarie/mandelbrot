// scaling with 256 bins
function drawMandelbrot (mandelbrot, canvas, opts) {
  console.log('Drawing Mandelbrot...');
  var t1 = new Date();

  var width = mandelbrot.width;
  var height = mandelbrot.height;
  var ctx = canvas.getContext('2d');
  var id = ctx.createImageData(width, height);
  var d = id.data;

  var escapeVals = [].concat.apply([], mandelbrot.smoothEscapeValsGrid);
  escapeVals.sort(function (a, b) { return a - b; });
  colorVals = new Array(256);
  var k = 0, idx;
  while (k < 256) {
    idx = Math.floor(width * height / 256 * k);
    colorVals[k] = escapeVals[idx];
    k++;
  }

  var i = 0, j, pixelNum, escapeNum;
  while (i < width) {
    j = 0;
    while (j < height) {
      escapeNum = mandelbrot.smoothEscapeValsGrid[j][i];
      pixelNum = i + j * width;
      k = 0;
      while (k < 256) {
        if (colorVals[k] < escapeNum ) {
          k++;
        } else {
          break;
        }
      }
      d[4 * pixelNum + 0] = k;
      d[4 * pixelNum + 1] = k;
      d[4 * pixelNum + 2] = k;
      d[4 * pixelNum + 3] = 255;

      j++;
    }
    i++;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(id, 0, 0);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}

module.exports = drawMandelbrot;
