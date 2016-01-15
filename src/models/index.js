var fs = require('fs');
var files = fs.readdirSync(__dirname);
var str = require('underscore.string');

files.forEach(function(file){
  if(file !== 'index.js') {
	exports[str.classify(file.replace('.js', ''))] = require('./' + file);
  }
});
