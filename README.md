# rememberify [![NPM version](http://img.shields.io/npm/v/rememberify.svg?style=flat-square)](https://www.npmjs.org/package/rememberify)

File cache plugin for [browserify](http://browserify.org/).

Basically, this is [watchify](https://github.com/substack/watchify) without the file watch mode! Use this plugin if you're already listening for file system events via something like [gulp-watch](https://github.com/floatdrop/gulp-watch) or [chokidar](https://github.com/paulmillr/chokidar), and want only the caching mechanism of watchify.

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

And then when you receive a file system event, invalidate the cache:

```javascript
rememberify.forget(b, file);
```
