"use strict";

/**
 * Importing all plugins
 * @author Samuel Castro
 * @since 1/14/2016
 */
var fs = require('fs');
var files = fs.readdirSync(__dirname);

module.exports = [];
files.forEach(function(file){
  if(file !== 'index.js')
    module.exports.push(require('./' + file));
});
