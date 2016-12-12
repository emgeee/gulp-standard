#gulp-standard
[![Build Status](https://travis-ci.org/emgeee/gulp-standard.png?branch=master)](https://travis-ci.org/emgeee/gulp-standard)
[![NPM version](https://badge.fury.io/js/gulp-standard.png)](http://badge.fury.io/js/gulp-standard)

> [Standard](https://github.com/feross/standard/) linter for gulp

## Information

<table>
<tr>
<td>Package</td><td>gulp-standard</td>
</tr>
<tr>
<td>Description</td>
<td>Standard plugin for gulp</td>
</tr>
<tr>
<td>Node version</td>
<td>>= 0.9</td>
</tr>
<tr>
<td>gulp version</td>
<td>3.x</td>
</tr>
</table>

## Usage

#### Install

```sh
$ npm install --save-dev gulp-standard
```

## Examples

```javascript
// include the required packages.
var gulp = require('gulp')
var standard = require('gulp-standard')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})
```

## Reporters

#### Built-in

You can choose a reporter when you call
````javascript
stuff
  .pipe(standard())
  .pipe(standard.reporter('default', opts))
External
````

You can also use some other custom made reporter
````javascript
var reporter = require(<SOME_REPORTER>)

stuff
  .pipe(standard())
  .pipe(standard.reporter(reporter, opts))
````
OR -
````javascript
stuff
  .pipe(standard())
  .pipe(standard.reporter(<REPORTER NAME>, opts))
````
#### Reporter options

##### breakOnError

Type: `boolean`
Default: `false`

Emit gulp error on reported error

##### breakOnWarning

Type: `boolean`
Default: `false`

Emit gulp error on reported warning

##### quiet

Type: `boolean`
Default: `false`

Suppress success messages, only show errors

##### showRuleNames

Type: `boolean`
Default: `false`

Show rule names for errors/warnings (to ignore specific rules)

##### showFilePath

Type: `boolean`
Default: `false`

Show the full file path with the line and column numbers (useful for IDEs that will link to that location)

## LICENSE [MIT](LICENSE)
