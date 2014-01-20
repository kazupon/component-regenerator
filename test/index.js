/**
 * import(s)
 */

var fs = require('fs');
var read = fs.readFileSync;
var expect = require('expect.js');
var Builder = require('component-builder');
var regenerator = require('regenerator');
var plugin = require(process.env.COMPONENT_REGENERATOR_COV ? '../lib-cov/' : '../');


/**
 * test(s)
 */

describe('component-regenerator', function () {

  describe('exist scripts', function () {
    var hello_path = __dirname + '/fixtures/hello/hello.js';
    var world_path = __dirname + '/fixtures/hello/world.js';

    before(function (done) {
      var options = { includeRuntime: false };
      this.hello_js_str = regenerator(read(hello_path, 'utf8').toString(), options);
      this.world_js_str = regenerator(read(world_path, 'utf8').toString(), options);

      var builder = new Builder(__dirname + '/fixtures/hello');
      builder.use(plugin);
      builder.build(function (err, res) {
        if (err) return done(err);
        this.resource = res;
        done();
      }.bind(this));
    });

    describe('build javascript', function () {
      it('expect to contain regenerate script string', function (done) {
        expect(this.resource.js).to.contain(this.hello_js_str);
        expect(this.resource.js).to.contain(this.world_js_str);
        done();
      });
    });
  });

  describe('not exist scripts', function () {
    before(function (done) {
      var builder = new Builder(__dirname + '/fixtures/null');
      builder.use(plugin);
      builder.build(function (err, res) {
        if (err) return done(err);
        this.resource = res;
        done();
      }.bind(this));
    });

    describe('build javascript', function () {
      it('exptect to be empty', function (done) {
        expect(this.resource.js).to.be.empty();
        done();
      });
    });
  });

  describe('module dependency', function () {
    var hello_path = __dirname + '/fixtures/deps/hello.js';
    var module_path = __dirname + '/fixtures/deps/components/component-stack/index.js';

    before(function (done) {
      var options = { includeRuntime: false };
      this.hello_js_str = regenerator(read(hello_path, 'utf8').toString(), options);
      this.module_js_str = regenerator(read(module_path, 'utf8').toString(), options);

      var builder = new Builder(__dirname + '/fixtures/deps');
      builder.use(plugin);
      builder.build(function (err, res) {
        if (err) return done(err);
        this.resource = res;
        done();
      }.bind(this));
    });

    describe('build javascript', function () {
      it('expect to contain script string', function (done) {
        expect(this.resource.js).to.contain(this.hello_js_str);
        expect(this.resource.js).to.contain(this.module_js_str);
        done();
      });
    });
  });
});
