var gulp = require('gulp');
var browserify = require('browserify');
var fs = require('fs');

gulp.task('build', function () {
  var browserifyInstance = browserify(['./public/client.js']);
  var writable = fs.createWriteStream('./public/bundle.js');
  browserifyInstance.bundle().pipe(writable);
});
