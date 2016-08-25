var gulp = require('gulp')
var standard = require('../')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      quiet: true
    }))
})

gulp.task('default', ['standard'])
