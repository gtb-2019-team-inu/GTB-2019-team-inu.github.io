var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var connect = require('gulp-connect');

gulp.task('connect', function(cb){
  connect.server({
    root: './',
    livereload: true
  });
  return cb();
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(gulp.dest('./'));
});

gulp.task('pug', () => {
  return gulp.src('./pug/index.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('livereload', function (){
  return gulp.src('./**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass','livereload'));
  gulp.watch('./pug/index.pug', gulp.series('pug','livereload'));
});

gulp.task('default', gulp.parallel('connect', 'watch'), function(){
  return;
});