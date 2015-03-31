var through2 = require('through2')
var standard = require('standard')
var gutil = require('gulp-util')

var PLUGIN_NAME = 'gulp-standard'

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

    standard.lintText(String(file.contents), opts, function (err, data) {
      if (err) {
        return cb(err)
      }
      file.standard = data
      cb(null, file)
    })
  }

  return through2.obj(processFile)
}

module.exports = gulpStandard
