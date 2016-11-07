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

gulp.task('process-images', () => {

    const ret = gulp.src(['./app/images/**/*.+(png|jpg|jpeg|gif|svg)'])
        .pipe(imagemin({
            interlaced: true,
            progressive: true
        }))
        .pipe(gulp.dest('public/images'));

    return ret;
});


// Webpack
gulp.task('webpack', function () {
    return gulp.src('./app/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./'));
});

// Build js
gulp.task('js', function () {
    return browserify({entries: './app/app.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
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
    gulp.watch('./app/**/*', ['js', 'css', 'process-images'])
});

gulp.task('default', ['watch', 'process-images']);

gulp.task('production', ['js', 'css', 'process-images']);