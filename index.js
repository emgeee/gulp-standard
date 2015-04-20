'use strict'

var through2 = require('through2'),
  standard = require('standard'),
  gutil = require('gulp-util'),
  PLUGIN_NAME = require('./package.json').name

function gulpStandard (opts) {
  opts = opts || {}

  function processFile (file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'))
      return cb()
    }

    standard.lintText(String(file.contents), opts, function(err, data) {
      if (err) {
        return cb(err)
      }
      file.standard = data
      cb(null, file)
    })
  }

  return through2.obj(processFile)
}

gulpStandard.reporter = function (reporter, opts) {
  if (typeof reporter === 'function')
    return reporter(opts)
  if (typeof reporter === 'string')
    return require('gulp-standard/reporters/' + reporter)(opts)
}

module.exports = gulpStandard
