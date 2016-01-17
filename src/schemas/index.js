"use strict";

/**
 * Importing all schemas
 * @author Samuel Castro
 * @since 1/13/2016
 */
var fs = require('fs'),
    files = fs.readdirSync(__dirname),
    str = require('underscore.string');

files.forEach(function(file){
  if(file !== 'index.js') {
	exports[str.classify(file.replace('.js', ''))] = require('./' + file);
  }
});
