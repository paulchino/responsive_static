var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css');
    //sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    //--- imagemn not used
    //imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    //concat not used
    //concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    //livereload not used
    // livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('clean', function(cb) {
    del(['assets/dist/css/styles', 'assets/dist/js'], cb)
});

//--- css minify
gulp.task('styles', function() {
    return gulp.src('src/css/styles/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/dist/css/styles'));
});

//---- scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//---- Gulp watch listener. Automatically runs noted task
gulp.task('watch', function() {
  gulp.watch('src/css/styles/*.css', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  // gulp.watch('src/images/**/*', ['images']);
});
