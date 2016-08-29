var gulp = require('gulp');
var webpack = require('webpack-stream');
var serve = require('gulp-serve');
var jsonServer = require('json-server');

// all for the love of squished css
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

// Webpack
gulp.task('webpack', function() {
  return gulp.src('./app/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'));
});

// CSS minification
gulp.task('css', function() {
	gulp.src('app/css/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('../public/css'))
});

// Watch
gulp.task('watch', function() {
    gulp.watch('./app/**/*', ['webpack', 'css'])
});

gulp.task('default', ['watch']);