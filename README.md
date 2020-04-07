# [gulp](https://github.com/wearefractal/gulp)-minify-selectors 
> A simple gulp plugin to minify selectors name through your entire project

## Install

Install with [npm](https://npmjs.org/package/gulp-minify-selectors).

```
npm install --save-dev gulp-minify-selectors
```
Or with [yarn](https://yarnpkg.com/package/gulp-minify-selectors).
```
yarn add --dev gulp-minify-selectors
```

## Examples

#### Basic exemple

```js
var gulp = require('gulp');
var minifySelectors = require('gulp-minify-selectors');

return gulp.src(['src/style.css','src/index.js', 'src/index.html'])
  .pipe(minifySelectors())
  .pipe(gulp.dest('dist'))
```
You can use *gulp-minify-selectors* with every file extension since it use simple regex to operate the replacements. This exemple show *.css*, *.js* and *.html* but you can also do it with *.jsx*, *.pug*, *.scss*, *.ts* or wethever you want. 
The only things you have to do is the prefix or suffix or prefix and suffix your actual selectors so that the tool can recognize them. **By default it expect *-s-* prefix and no suffix**.

You can obviously override default settings like the following exemple:

#### Use with options object

```js
var gulp = require('gulp');
var minifySelectors = require('gulp-minify-selectors');

return gulp.src(['src/style.css','src/index.js', 'src/index.html'])
  .pipe(minifySelectors({
    prefix: 'my-custom-prefix-',
    suffix: '-suffix'
  }))
  .pipe(gulp.dest('dist'))
```

To fetch your selector *gulp-minify-selectors* use some patterns. This patterns can be *prefix*, *suffix* or both *prefix and suffix*. In most cases, a prefix is good enough, but if you encounter a problem because it interfer with something in your code, you can use prefix and suffix which is stronger. If you don't provide at least one of them it will throw an error.

#### Error handling


```js
var gulp = require('gulp');
var minifySelectors = require('gulp-minify-selectors');

gulp.task('minify-selectors', function(done) {
return gulp.src(['src/style.css','src/index.js', 'src/index.html'])
  .pipe(
    minifySelectors({
      // This options object will throw an error
      prefix: null,
      suffix: null
    })
  ).on( 'error', (e) => {
    console.error( "[ERROR]: " + e.message)
    done()
  })
  .pipe(gulp.dest('dist'))
});
```

By default an error will interupt the building process. If you want to get rid of this inconvenience you can handle the error by catching the *error* event like in this exemple. 


## Options

Function `minifySelectors(options?)` take an facultative options object as parameter.

```js
minifySelectors({
  prefix: 'prefix-',
  suffix: '-suffix'
})
```

Available options are:

* `prefix` ( string | null ) : The prefix use to find your selector
* `suffix` ( string | null ) : The suffix use to find your selector

## License

The MIT License (MIT)

Copyright (c) 2020, Julien OPPLIGER

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---------------------

0101011000110000001100000100010000110000001100000110010101100100 