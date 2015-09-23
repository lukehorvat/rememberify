"use strict";

var objectAssign = require("object-assign");
var through = require("through2");
var path = require("path");

module.exports = function(b) {
  function reset() {
    b.pipeline.get("deps").push(through.obj(function(row, enc, callback) {
      var file = row.expose ? b._expose[row.id] : row.file;
      b._options.cache[file] = { source: row.source, deps: objectAssign({}, row.deps) };
      callback(null, row);
    }));
  }

  b.on("reset", reset);

  reset();

  return b;
};
