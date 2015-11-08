"use strict";

var assert = require("assert");
var fs = require("fs");
var sinon = require("sinon");
var tempWrite = require("temp-write");
var browserify = require("browserify");
var rememberify = require("./");

describe("rememberify", function() {
  it("should cache files until forget() is called", function(done) {
    var file = fs.realpathSync(tempWrite.sync());
    var spy = sinon.spy();
    var b = browserify(file, { cache: {} }).plugin(rememberify).on("file", spy);

    b.bundle(function(err) {
      if (err) { return done(err) }

      assert.equal(spy.callCount, 1);

      b.bundle(function(err) {
        if (err) { return done(err) }

        assert.equal(spy.callCount, 1);
        rememberify.forget(b, file);

        b.bundle(function(err) {
          if (err) { return done(err) }

          assert.equal(spy.callCount, 2);

          b.bundle(function(err) {
            if (err) { return done(err) }

            assert.equal(spy.callCount, 2);
            done();
          });
        });
      });
    });
  });
});
