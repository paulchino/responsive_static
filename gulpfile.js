var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css');
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    //jshint = require('gulp-jshint'),
    //uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    //concat not used
    //concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    //livereload not used
    // livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('default', ['clean'], function() {
    gulp.start('styles');
    gulp.start('images');
});

gulp.task('clean', function(cb) {
    del(['assets/css', 'assets/img'], cb)
});

//compiles and minifys sass files
gulp.task('styles', function () {
  gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())  
    .pipe(gulp.dest('assets/css'))  
});

//compiles images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['styles']);
  //gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/imag/**/*', ['images']);
});

