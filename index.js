"use strict";

var objectAssign = require("object-assign");
var through = require("through2");
var path = require("path");

module.exports = function(b) {
  var cache = b._options.cache;

  if (cache) {
    b.on("reset", reset);
    reset();
  }

  function reset() {
    b.pipeline.get("deps").push(through.obj(function(row, enc, callback) {
      var file = row.expose ? b._expose[row.id] : row.file;
      cache[file] = { source: row.source, deps: objectAssign({}, row.deps) };
      callback(null, row);
    }));
  }

  return b;
};

module.exports.forget = function(b, file) {
  var cache = b._options.cache;

  if (cache) {
    delete cache[file];
  }
};
