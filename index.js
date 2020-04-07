"use strict";

const PluginError = require("plugin-error");
const through = require("through2");

const PLUGIN_NAME = "gulp-minify-selectors";

let selectors = []

function gulpMinifySelectors ( options = {
  prefix: '-s-',
  suffix: ''
} ) {
  return through.obj(function (file, encoding, callback) {

    // @ Parameter filtering
    if( !options.prefix || options.prefix == '') options.prefix = null
    if( !options.suffix || options.suffix == '') options.suffix = null
    if( !options.prefix && !options.suffix ) {
      this.emit("error", new PluginError(PLUGIN_NAME, "gulpMinifySelectors need a prefix or a suffix or both."));
      return callback(null, file);
    }

    // @ File checking

    if (file.isNull()) {
      this.emit("error", new PluginError(PLUGIN_NAME, "No file provided"));
      return callback(null, file);
    }

    if (file.isDirectory()) {
      this.emit("error", new PluginError(PLUGIN_NAME, "Directories aren't supported"));
      return callback(null, file);
    }

    if (file.isStream()) {
        this.emit("error", new PluginError(PLUGIN_NAME, "Streaming not supported"));
        return callback(null, file);
    }

    try {

      // @ Retrieve selectors and generate minified verision

      let content = file.contents.toString(encoding);
      let reg;
      if( options.prefix && options.suffix )
        reg = new RegExp(`(${options.prefix}.*?${options.suffix})`)
      if( options.prefix && !options.suffix )
        reg = new RegExp(`"?(${options.prefix}.*?)[" ,:.]`,'g');
      if( !options.prefix && options.suffix )
        reg = new RegExp(`[" ,:.]([^" ,:.]*?${options.suffix})`)
      let result;
            

      for( let cnt = Object.keys(selectors).length; (result = reg.exec(content)) !== null; ) {
        if( selectors.map(x => x.sel).indexOf(result[1]) === -1 ){
          selectors.push({ sel: result[1], mini: genLexStr(cnt++)});
        }
      }          

      // @ Sort selectors list by string length to prevent conflict when replacing

      selectors.sort((a,b) => {
        if (a.sel.length > b.sel.length)
          return -1;
        if (a.sel.length < b.sel.length)
          return 1;
        return 0;
      })   
            
      
      // @ Replace old selectors by the new ones

      for (let sel of selectors) {      
        content = content.replace(new RegExp(sel.sel, "gm"), sel.mini)
      }

      // @ Put the minified content in a new file
      
      let newfile = file.clone();
      newfile.contents = new Buffer.from(content)
      
      // @ Return to pipeline

      return callback(null, newfile);
    }
    catch(e) {
      this.emit("error", new PluginError(PLUGIN_NAME, e.message));
      return callback(null, file);
    }
  })
}

/**
 * Generate a lexicographical string
 * 
 * @param {integer} step - A number representing the lexicographical step
 * @return {string} The lexicographical string
 */
function genLexStr( step ) {

  // @ Parameter filtering

  if( step < 0 ) throw new RangeError("Index cannot be lower than 0")
  step = parseInt(step)

  // @ Variables initialisation

  const chars = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
  for( var nb = 1; step >= Math.pow(chars.length, nb); nb++ );
  let short = "";

  // @ String building

  (function getLetter ( val, op ) {
    let letter = Math.floor( val / Math.pow(chars.length, op) % chars.length );
    if( op === nb-1 && op > 0 ) letter--;

    short += chars[letter]
    
    val = val >= Math.pow(chars.length, op) ? val - Math.pow(chars.length, op) : val
    if(op > 0) getLetter( val, --op )
  })( step, nb - 1 )
  
  // @ Return

  return short;
}

module.exports = gulpMinifySelectors;