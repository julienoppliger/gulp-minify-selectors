'use strict';

const PluginError = require('plugin-error');
const through = require('through2');
const chalk = require('chalk');

const PLUGIN_NAME = 'gulp-minify-selectors';

const selectors = [];

function gulpMinifySelectors( options = {} ) {
	return through.obj(function (file, encoding, next) {

		// @ Parameter filtering

		if (!options.prefix) options.prefix = '-s-';
		if (!options.suffix) options.suffix = null;
		if (options.prefix === '') options.prefix = null;
		if (options.suffix === '') options.suffix = null;		


		// @ File checking

		if (file.isNull()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'No file provided'));
			return next(null, file);
		}

		if (file.isDirectory()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Directories aren\'t supported'));
			return next(null, file);
		}

		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return next(null, file);
		}

		try {			

			// @ Retrieve selectors and generate minified verision

			let content = file.contents.toString(encoding);
			let reg;
			if (options.prefix && options.suffix)
				reg = new RegExp(`(${options.prefix}.*?${options.suffix})`);
			if (options.prefix && !options.suffix)
				reg = new RegExp(`"?(${options.prefix}.*?)["' ,:.]`, 'g');
			if (!options.prefix && options.suffix)
				reg = new RegExp(`["' ,:.]([^"' ,:.]*?${options.suffix})`);
			let result;

			for (let cnt = Object.keys(selectors).length; (result = reg.exec(content)) !== null;) {
				if (selectors.map(x => x.sel).indexOf(result[1]) === -1) {
					selectors.push({ sel: result[1], mini: generateLexiString(cnt++) });
				}
			}

			// @ Sort selectors list by string length to prevent conflict when replacing

			selectors.sort((a, b) => {
				if (a.sel.length > b.sel.length)
					return -1;
				if (a.sel.length < b.sel.length)
					return 1;
				return 0;
			});

			// @ Replace old selectors by the new ones

			for (const sel of selectors) {
				content = content.replace(new RegExp(sel.sel, 'gm'), sel.mini);
			}

			// @ Put the minified content in a new file

			const newfile = file.clone();
			newfile.contents = new Buffer.from(content);			

			if( options.verbose ) {
				let colors = ['#F2AA00','#F5C900','#F7E800','#EAF900','#CEFB00','#B0FC00','#93FD00','#75FE00','#57FE00','#38FF00'];
				let data = {
					file: file.basename,
					size_from: (file.contents.length / 1000).toFixed(2),
					size_to: (newfile.contents.length / 1000).toFixed(2),
					reduced_by: 100 - Math.round(newfile.contents.length/file.contents.length*100)
				}
				let report = `[${chalk.hex("#AAA")("gulp-minify-selectors")}]`;
				report += `[${chalk.bold(data.file)}]: `;
				report += `${data.size_from}Kb`;
				report += ' => ';
				report += `${data.size_to}Kb `;
				report += `(${chalk.hex(colors[Math.round(data.reduced_by/10)])(data.reduced_by + '%')})`;

				console.log(report);				
			}

			// @ Return to pipeline

			return next(null, newfile);
		}
		catch (error) {
			this.emit('error', new PluginError(PLUGIN_NAME, error.message));
			return next(null, file);
		}
	});
}

/**
 * Generate a lexicographical string
 *
 * @param {integer} step - A number representing the lexicographical step
 * @return {string} The lexicographical string
 */
function generateLexiString(step) {

	// @ Parameter filtering

	if (step < 0) throw new RangeError('Index cannot be lower than 0');
	step = parseInt(step, 10);

	// @ Variables initialisation

	const chars = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
	let nb;
	for (nb = 1; step >= Math.pow(chars.length, nb); nb++);
	let short = '';

	// @ String building

	(function getLetter(val, op) {
		let letter = Math.floor(val / Math.pow(chars.length, op) % chars.length);
		if (op === nb - 1 && op > 0) letter--;

		short += chars[letter];

		val = val >= Math.pow(chars.length, op) ? val - Math.pow(chars.length, op) : val;
		if (op > 0) getLetter(val, --op);
	})(step, nb - 1);

	// @ Return

	return short;
}

module.exports = gulpMinifySelectors;
