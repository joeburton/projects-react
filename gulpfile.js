var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var args = require('yargs').argv;
var gulpif = require('gulp-if');

var isDevelopment = true;

// Optimize images
gulp.task('process-images', () => {

    const ret = gulp.src(['./app/images/**/*.+(png|jpg|jpeg|gif|svg)'])
        .pipe(imagemin({
            interlaced: true,
            progressive: true
        }))
        .pipe(gulp.dest('public/images'));

    return ret;
});


// http://egorsmirnov.me/2015/05/22/react-and-es6-part1.html
gulp.task('js', ['js-bootstrap'], function () {

    // Turn debug to false to remove source maps
    return browserify({ entries: './app/js/app.js', extensions: ['.js'], debug: isDevelopment })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulpif(!isDevelopment, streamify(uglify())))
        .pipe(gulp.dest('public/js'));

});

// Include bootstrap JS
gulp.task('js-bootstrap', function () {
    gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('public/js'));
});


// CSS minification
gulp.task('sass', function () {
    
    var compressed = isDevelopment ? 'expanded' : 'compressed';
    
    return sass('./app/css/app.scss', {
        style: compressed,
        sourcemap: isDevelopment,
        loadPath: ['node_modules/bootstrap-sass/assets/stylesheets']
    })
        .pipe(concat('style.min.css'))
        .pipe(gulpif(!isDevelopment, minifyCSS()))
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
		// for file sourcemaps
		.pipe(gulpif(isDevelopment, sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: 'source'
		})))
        .pipe(gulp.dest('./public/css/'))
        .pipe(gulp.dest('./app/css/'));

});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});


// CSS minification
gulp.task('css', function () {

    gulp.src('./app/css/style.min.css')
        .pipe(gulp.dest('./public/css'))
});


// Watch
gulp.task('watch', function () {
    gulp.watch('./app/**/*', ['js', 'sass', 'fonts', 'process-images'])
});


// Default
gulp.task('default', ['watch']);


// Dev build
gulp.task('dev', ['js', 'sass', 'fonts', 'process-images']);


// Set to prod
gulp.task('set-env', () => {
    isDevelopment = false;
});


// Build production:
gulp.task('production', ['set-env', 'js', 'css', 'fonts', 'process-images']);


// Prepare css for production - work around due to ruby gems issue on the server
gulp.task('prepare', ['set-env', 'sass']);
