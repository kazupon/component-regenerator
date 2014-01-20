/**
 * Import(s)
 */

var path = require('path');
var fs = require('fs');
var read = fs.readFileSync;
var write = fs.writeFileSync;
var debug = require('debug')('component:regenerator');
var regenerator = require('regenerator');

/**
 * Export(s)
 */

module.exports = plugin;

/**
 * Constant(s)
 */

var GENERATOR_REGEX = /\bfunction\s*\*/;


function plugin (builder) {
  builder.hook('before scripts', function (pkg, next) {
    if (!pkg.root) return next();

    var scripts = pkg.config.scripts;
    debug('before scripts: %j', scripts);
    if (!scripts) return next();

    var mapper = {};
    scripts.forEach(function (script) {
      var ext = path.extname(script);
      if (ext !== '.js') return;

      var script_path = pkg.path(script);
      var str = read(script_path, 'utf8').toString();
      if (GENERATOR_REGEX.test(str)) {
        mapper[script] = regenerator(str, { includeRuntime: false });
      } else {
        mapper[script] = str;
      }
    });
    debug('after scripts: %j', scripts);

    Object.keys(mapper).forEach(function (script) {
      // refresh
      pkg.removeFile('scripts', script);
      pkg.addFile('scripts', script, mapper[script]);
    });
    debug('build scripts: %j', scripts);

    next();
  });
}
