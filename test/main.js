var standard = require('../')
var gulp = require('gulp')
var assert = require("assert")
var through2 = require('through2')
require('mocha')

describe('gulp-standard', function () {
  it('should throw an error', function (done) {
    gulp.src('./test/testFile1.js')
      .pipe(standard())
      .pipe(through2.obj(function (file, enc, cb) {
        this.push(file)
        cb()
      }))
      .on('error', function (err) {
        assert(err.message)
        done()
      })
      .on('finish', function() {
        done()
      })
  })

})
