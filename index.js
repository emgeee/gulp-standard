var through2 = require('through2')
var standard = require('standard')
var gutil    = require('gulp-util')

var PLUGIN_NAME = 'gulp-standard'

function gulpStandard () {
  function processFile (file, enc, cb) {
    var self = this

    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'))
      return cb()
    }


    this.push(file)
    cb()
    // var string = String(file.contents);
    // standard.lintText(string, {}, function (err, res) {
    //
    //   if(err) {
    //     cb(err)
    //   } else if (!!res.results[0].errorCount) {
    //     self.push(file)
    //
    //     cb(new Error(res.results[0].messages))
    //   } else {
    //     self.push(file)
    //     cb()
    //   }
    // })
  }

  return through2.obj(processFile)
}

module.exports = gulpStandard
