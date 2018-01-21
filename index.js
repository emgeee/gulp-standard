'use strict'

var through2 = require('through2')
var standard = require('standard')
var PluginError = require('plugin-error')
var PLUGIN_NAME = require('./package.json').name
var defaultReporter = require('./reporters/stylish')

function gulpStandard (opts) {
  function processFile (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streams are not supported!'))
    }

    standard.lintText(String(file.contents), Object.assign({
      filename: file.path
    }, opts), function (err, data) {
      if (err) {
        return cb(err)
      }
      file.standard = data
      if (data.results[0].output) {
        file.contents = Buffer.from(data.results[0].output)
        data.fixed = true
      }
      cb(null, file)
    })
  }

  return through2.obj(processFile)
}

gulpStandard.reporter = function (reporter, opts) {
  // Load default reporter
  if (reporter === 'default') return defaultReporter(opts)

  // Load reporter from function
  if (typeof reporter === 'function') return reporter(opts)

  // load built-in reporters
  if (typeof reporter === 'string') {
    try {
      return require('gulp-standard/reporters/' + reporter)(opts)
    } catch (err) {}
  }

  // load full-path or module reporters
  if (typeof reporter === 'string') {
    try {
      return require(reporter)(opts)
    } catch (err) {}
  }
}

module.exports = gulpStandard
