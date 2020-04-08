# gulp-minify-selectors [![npm version](https://badge.fury.io/js/gulp-minify-selectors.svg)](https://www.npmjs.com/package/gulp-minify-selectors)
> A simple [gulp](https://github.com/wearefractal/gulp) plugin to minify selectors through your entire project.

## Install

Install with [npm](https://npmjs.org/package/gulp-minify-selectors).

```
npm install --save-dev gulp-minify-selectors
```
Or with [yarn](https://yarnpkg.com/package/gulp-minify-selectors).
```
yarn add --dev gulp-minify-selectors
```
## How it work

*gulp-minify-selectors* track down selectors in your entire project and replace them by a very short lexicographical string. This process drastically reduce you code size.

**It will take this code**

```html
<div class="-s-Card">
  <div class="-s-Card__Image">
    <img src="assets/images/illustration.jpg">
  </div>
  <div class="-s-Card__Headline">
    <span>Hello world !</span>
  </div>
  <p class="-s-Card__Text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
</div>
```
```css
.-s-Card { display: flex; flex-direction: column; font-family: "Roboto", sans-serif; }
.-s-Card__Image { height: 200px; }
.-s-Card__Headline { font-size: 1.5rem; font-weight: bold; }
.-s-Card__Text { font-size: 1.2rem; }
```
```js
let card = document.querySelector("-s-Card");
```

**and turn it into this code**

```html
<div class="a">
  <div class="b">
    <img src="assets/images/illustration.jpg">
  </div>
  <div class="c">
    <span>Hello world !</span>
  </div>
  <p class="d">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
</div>
```
```css
.a { display: flex; flex-direction: column; font-family: "Roboto", sans-serif; }
.b { height: 200px; }
.c { font-size: 1.5rem; font-weight: bold; }
.d { font-size: 1.2rem; }
```
```js
let card = document.querySelector("a");
```

## Examples

#### Basic example

```js
var gulp = require('gulp');
var minifySelectors = require('gulp-minify-selectors');

return gulp.src(['src/style.css','src/index.js', 'src/index.html'])
  .pipe(minifySelectors())
  .pipe(gulp.dest('dist'))
```
You can use *gulp-minify-selectors* with every file extension since it uses basic regex to operate the substitutions. This example show *.css*, *.js* and *.html* but you can also do it with *.jsx*, *.pug*, *.scss*, *.ts* or wathever you want. 

The only things you have to do is the prefix or suffix or prefix and suffix your actual selectors so that the tool can identify them. **By default it expect *-s-* prefix and no suffix**.

You can obviously override default settings by passing an options object like the following example:

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

To fetch your selectors *gulp-minify-selectors* use some patterns. This patterns can be *prefix*, *suffix* or both *prefix and suffix*. In most cases, a prefix is good enough, but if you face a problem because it is interfering with something in your code, then, it would be more appropriate to use both prefix and suffix

If you don't provide at least one of them it will throw an error.

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

By default an error will interupt the building process. If you want to get rid of this inconvenience you can handle the error by catching the *error* event as shown in this example.


## API

> `minifySelectors([options])`

```js
minifySelectors({
  prefix: 'prefix-',
  suffix: '-suffix'
})
```

#### Options

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