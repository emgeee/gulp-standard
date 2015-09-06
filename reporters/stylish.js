'use strict'

var path = require('path'),
  through2 = require('through2'),
  gutil = require('gulp-util'),
  colors = require('colors/safe'),
  logSymbols = require('log-symbols'),
  appRoot = require('app-root-path'),
  PLUGIN_NAME = require('../package.json').name

function Stylish (options) {
  var totalErrorCount = 0
  var totalWarningCount = 0

  // File specific reporter
  function reportFile (filepath, data) {
    var lines = []

    // Filename
    lines.push(colors.magenta.underline(path.relative(appRoot.path, filepath)))

    // Loop file specific error/warning messages
    data.results.forEach(function (file) {
      file.messages.forEach(function (msg) {
        var line = colors.yellow('line ' + msg.line + ':' + msg.column) + '\t' + colors.cyan(msg.message)
        lines.push(line)
      })
    })

    // Error/Warning count
    lines.push(logSymbols.error + ' ' + colors.red(data.errorCount + ' error' + (data.errorCount === 1 ? 's' : '')) + '\t' + logSymbols.warning + ' ' + colors.yellow(data.warningCount + ' warning' + (data.errorCount === 1 ? 's' : '')))

    return lines.join('\n') + '\n'
  }

  // Reporter header
  function reportHeader () {
    console.log(colors.green('Standard linter results'))
    console.log('======================================\n')
  }

  // Reporter footer
  function reportFooter () {
    if (totalErrorCount === 0 && totalWarningCount === 0) {
      console.log(logSymbols.success + ' ' + colors.green('All OK!'))
    } else {
      console.log('======================================')
      console.log(logSymbols.error + colors.red(' Errors total: ' + totalErrorCount))
      console.log(logSymbols.warning + colors.yellow(' Warnings total: ' + totalWarningCount) + '\n')
    }
  }

  reportHeader()

  return through2.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'))
    }

    // Report file specific stuff only when there are some errors/warnings
    if (file.standard && (file.standard.errorCount || file.standard.warningCount)) {
      totalErrorCount += file.standard.errorCount
      totalWarningCount += file.standard.warningCount

      console.log(reportFile(file.path, file.standard))
    }

    cb()
  })
    .on('end', function () {
      reportFooter()

      // If user wants gulp to break execution on reported errors or warnings
      if (totalErrorCount && options.breakOnError) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Linter errors occurred!'))
      }
      if (totalWarningCount && options.breakOnWarning) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Linter warnings occurred!'))
      }
    })
}

module.exports = Stylish
