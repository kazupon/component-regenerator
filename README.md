# component-regenerator

[![Build Status](https://travis-ci.org/kazupon/component-regenerator.png?branch=master)](https://travis-ci.org/kazupon/component-regenerator) [![Coverage Status](https://coveralls.io/repos/kazupon/component-regenerator/badge.png)](https://coveralls.io/r/kazupon/component-regenerator) [![NPM version](https://badge.fury.io/js/component-regenerator.png)](http://badge.fury.io/js/component-regenerator) [![Dependency Status](https://david-dm.org/kazupon/component-regenerator.png)](https://david-dm.org/kazupon/component-regenerator)

facebook/regenerator plugin for component-builder

# Installing

```
$ npm install -g component-regenerator
```

# Usage

To enable jscoverage of your scripts, run the following code.

```js
var Builder = require('component-builder');
var plugin = require('component-regenerator');
var fs = require('fs');

var builder = new Builder(__dirname);

builder.use(plugin);

builder.build(function (err, build) {
  if (err) {
    throw err;
  }
  fs.writeFileSync('build/build.js', build.require + build.js);
});
```

Or from the command line.

```
$ component build --use component-regenerator
```

# Testing

```
$ npm install
$ make test
```

# License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/kazupon/component-regenerator/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

