const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiFiles = require('chai-files');
const gulp = require('gulp');
const MinifySelector = require('.')
const Sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

chai.should();
chai.use(chaiFiles);

const expect = chai.expect;
const file = chaiFiles.file;

const 
	srcdir = 'tests/src/',
	destdir = 'tests/dest/',
	expecteddir = 'tests/expected/',
	src = file => path.join(srcdir,file),
	dest = file => path.join(destdir,file),
	expected = file => path.join(expecteddir,file)
	clear = file => fs.readdir(destdir, function(err, items) {
		if(err) return;
		items.map(item => fs.unlinkSync(dest(item)))
	});

describe('initialization', () => {

	it('should return the gulp-minify-selectors object', () => {
	  expect(MinifySelector).to.exist;
	});

});
  
describe('base features', () => {

	it('should write some files', done => {
		
	  gulp.src(src('basic.html'))
		.pipe(MinifySelector())
		.pipe(gulp.dest(destdir))
		.once('end', () => {
			expect(file(dest('basic.html'))).to.exist
			clear()
		  done();
		});

	});
	
	it('should perforom minification on basic files', done => {
		
	  gulp.src([src('basic.html'), src('basic.css'), src('basic.js')])
		.pipe(MinifySelector())
		.pipe(gulp.dest(destdir))
		.once('end', () => {
			expect(file(dest('basic.html'))).to.equal(file(expected('basic.html')));
			expect(file(dest('basic.css'))).to.equal(file(expected('basic.css')));
			expect(file(dest('basic.js'))).to.equal(file(expected('basic.js')));
			clear()
		  done();
		});

	});

	it('should perforom minification on various extensions', done => {
		
	  gulp.src([src('extensions.pug'), src('extensions.scss'), src('extensions.jsx'), src('extensions.vue')])
		.pipe(MinifySelector())
		.pipe(gulp.dest(destdir))
		.once('end', () => {
			expect(file(dest('extensions.pug'))).to.equal(file(expected('extensions.pug')));
			expect(file(dest('extensions.scss'))).to.equal(file(expected('extensions.scss')));
			expect(file(dest('extensions.jsx'))).to.equal(file(expected('extensions.jsx')));
			expect(file(dest('extensions.vue'))).to.equal(file(expected('extensions.vue')));
			clear()
		  done();
		});

	});

	it('should work inside a pipeline', done => {

	  gulp.src(src('pipeline.scss'))
		.pipe(Sass())
		.pipe(MinifySelector())
		.pipe(cleanCSS())
		.pipe(gulp.dest(destdir))
		.once('end', () => {
			expect(file(dest('pipeline.css')))
				.to.equal(file(expected('pipeline.css')));
			clear()
		  done();
		});

	});
	

  it('should allow empty files through', done => {

    let i = 0;

	  gulp.src(src('empty.css'))
      .pipe(MinifySelector())
      .on('data', file => i++ )
      .once('end', () => {
        i.should.equal(1);
        done();
      });
	});
	
	it('should write sourcemaps', done => {

    gulp.src(src('sourcemaps.css'))
      .pipe(sourcemaps.init())
			.pipe(MinifySelector())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(destdir))
      .once('end', () => {
				expect(file(dest('sourcemaps.css')))
					.to.equal(file(expected('sourcemaps.css')));
				clear()
        done();
      });
  });
})