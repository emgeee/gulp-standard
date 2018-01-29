/* globals it, describe */

var fs = require('fs')
var should = require('should')
var Vinyl = require('vinyl')
var os = require('os')
var standard = require('../')

require('mocha')

var testFile1 = fs.readFileSync('test/fixtures/testFile1.js')
var testFile2 = fs.readFileSync('test/fixtures/testFile2.js')
var testFile3 = fs.readFileSync('test/fixtures/testFile3.js')

describe('gulp-standard', function () {
  it('should lint files', function (done) {
    var stream = standard()
    var fakeFile = new Vinyl({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/testFile1.js',
      contents: testFile1
    })
    stream.once('data', function (newFile) {
      should.exist(newFile)
      should.exist(newFile.standard)
      should(newFile.standard.results[0].messages[0].message).equal("Expected '===' and instead saw '=='.")
      done()
    })
    stream.write(fakeFile)
    stream.end()
  })

  it('should catch broken syntax', function (done) {
    var stream = standard()
    var fakeFile = new Vinyl({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/testFile2.js',
      contents: testFile2
    })
    stream.once('data', function (newFile) {
      should(newFile.standard.results[0].messages[0].message)
        .equal('Parsing error: Unexpected token }')
      done()
    })
    stream.write(fakeFile)
    stream.end()
  })

  it('should continue the stream', function (done) {
    var stream = standard()
    var reporter = standard.reporter('default')
    var fakeFile = new Vinyl({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/testFile2.js',
      contents: testFile2
    })
    stream.write(fakeFile)
    stream.pipe(reporter)
    .once('data', function (newFile) {
      should(newFile.standard.results[0].messages[0].message)
        .equal('Parsing error: Unexpected token }')
      done()
    })
    stream.end()
  })

  it('should automatically format code', function (done) {
    var stream = standard({
      fix: true
    })
    var fakeFile = new Vinyl({
      base: 'test/fixtures',
      cwd: 'test/',
      path: 'test/fixtures/testFile3.js',
      contents: testFile3
    })
    stream.once('data', function (newFile) {
      should.exist(newFile)
      should.exist(newFile.standard)
      should.ok(newFile.standard.fixed)
      should(newFile.contents.toString()).equal('var a = 1' + os.EOL)
      done()
    })
    stream.write(fakeFile)
    stream.end()
  })
})
