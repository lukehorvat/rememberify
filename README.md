# rememberify [![NPM version](http://img.shields.io/npm/v/rememberify.svg?style=flat-square)](https://www.npmjs.org/package/rememberify) [![Build status](http://img.shields.io/travis/lukehorvat/rememberify.svg?style=flat-square)](https://travis-ci.org/lukehorvat/rememberify)

File cache plugin for [browserify](http://browserify.org/).

Basically, this is just [watchify](https://github.com/substack/watchify) without the file watch mode! Use this plugin if you're already listening for file system events via something like [gulp-watch](https://github.com/floatdrop/gulp-watch) or [chokidar](https://github.com/paulmillr/chokidar), and only want the caching mechanism of watchify for fast builds.

## Installation

Install the package with NPM:

```bash
$ npm install rememberify
```

## Usage

Register the plugin with a browserify instance:

```javascript
import browserify from "browserify";
import rememberify from "rememberify";

let b = browserify({ cache: {} }).plugin(rememberify);
```

When you receive a file system event, simply invalidate the cache:

```javascript
rememberify.forget(b, file);
```

## Tip

Using rememberify with gulp-watch is easy. Here's a full example:

```javascript
import gulp from "gulp";
import watch from "gulp-watch";
import source from "vinyl-source-stream";
import browserify from "browserify";
import rememberify from "rememberify";

let b = browserify("./lib/app.js", { cache: {} }).plugin(rememberify);

gulp.task("build", () => {
  return b.bundle().pipe(source("bundle.js")).pipe(gulp.dest("dist"));
});

gulp.task("watch", ["build"], () => {
  return watch("lib/**/*.js", vinyl => {
    rememberify.forget(b, vinyl.path);
    gulp.start("build");
  });
});
```
