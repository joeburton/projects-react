var gulp = require('gulp');
var webpack = require('webpack-stream');
var serve = require('gulp-serve');

// all for the love of squished css
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

gulp.task('process-images', () => {

    const ret = gulp.src(['./app/images/**/*.+(png|jpg|jpeg|gif|svg)'])
        // .pipe(imagemin({
        //     interlaced: true,
        //     progressive: true
        // }))
        .pipe(gulp.dest('public/images'));

    return ret;
});

// Webpack - not currently used
gulp.task('webpack', function () {
    return gulp.src('./app/js/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./'));
});

// Build js - [not currently used]
// Turn debug to false to remove source maps
// http://egorsmirnov.me/2015/05/22/react-and-es6-part1.html
gulp.task('js-dev', function () {
    
    return browserify({entries: './app/js/app.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('js-prod', function () {
    
    return browserify({entries: './app/js/app.js', extensions: ['.js'], debug: false})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js'));
});

// CSS minification
gulp.task('css', function () {
    
    gulp.src('./app/css/style.css')
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'))
});

// Watch
gulp.task('watch', function () {
    gulp.watch('./app/**/*', ['js-dev', 'css', 'process-images'])
});

gulp.task('default', ['watch']);

gulp.task('production', ['js-prod', 'css', 'process-images']);