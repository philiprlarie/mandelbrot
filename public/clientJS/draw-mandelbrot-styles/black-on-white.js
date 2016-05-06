// black on white based on linear gradient of escape num
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
      d[4 * pixelNum + 3] = 255 * escapeNum;
      j++;
    }
    i++;
  }

  ctx.putImageData(id, 0, 0);
  var t2 = new Date();
  console.log('Done. ' + (t2 - t1) / 1000 + ' seconds.');
}

module.exports = drawMandelbrot;
