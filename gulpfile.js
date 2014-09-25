// npm install gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify --save-dev


var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css'); // Minify CSS
var notify = require('gulp-notify'); // Terminal Messages
var uglify = require('gulp-uglify'); // Minify JS
var concat = require('gulp-concat'); // Concat src files in to one file
var imagemin = require('gulp-imagemin'); // Compresses images
var pngcrush = require('imagemin-pngcrush'); // Min .png files
var jpegtran = require('imagemin-jpegtran'); // Min .jpg files

gulp.task('default', function() {
  // gulp - default task code here	
	gulp.watch('css/*.css', ['css']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('images/*', ['images']);
});

gulp.task('css', function() {
	return gulp.src('css/*.css')
				.pipe(concat('minified.css'))
				.pipe(minifyCSS())
				.pipe(gulp.dest('css/min'))
				.pipe(notify('CSS - Compressed'));				
});

gulp.task('js', function() {
	return gulp.src('js/*.js')
				.pipe(concat('minified.js'))
				.pipe(uglify())
				.pipe(gulp.dest('js/min'))
				.pipe(notify('JS - Compressed'));
});

gulp.task('images', function() {
	return gulp.src('images/*')
			  .pipe(imagemin({
             progressive: true,
             svgoPlugins: [{removeViewBox: false}],
             use: [pngcrush()]
         }))
				 .pipe(imagemin({ 
					 progressive: true, 
					 use: [jpegtran()]
				 }))
         .pipe(gulp.dest('images/min'));
});