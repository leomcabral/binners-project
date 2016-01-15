'use strict';

/**
 * Utilities
 * @description Some utilities
 * @author Samuel Castro
 * @since 1/14/2016
 */
var marked = require('marked'),
	hapi = require('hapi'),
	fs = require('fs');

module.exports = {

	getErrorsCode: function() {
		return {
			DUPLICATED_USER: {
				errorCode: '001',
				message: 'Register using email already taken.'
			},
			USER_NOT_FOUND: {
				errorCode: '002',
				message: 'User not found.'
			},
			INVALID_PASSWORD: {
				errorCode: '003',
				message: 'Invalid password.'
			},
			EMAIL_NOT_FOUND: {
				errorCode: '004',
				message: 'Email not found.'
			},
			INVALID_EMAIL_FORMAT: {
				errorCode: '005',
				message: 'Invalid email format.'
			}
		}
	},

	// read a file and converts the markdown to HTML
	getMarkDownHTML: function( path, callback ){
		fs.readFile(path, 'utf8', function (err,data) {
			if (!err) {
				marked.setOptions({
					gfm: true,
					tables: true,
					breaks: false,
					pedantic: false,
					sanitize: true,
					smartLists: true,
					smartypants: false,
					langPrefix: 'language-',
					highlight: function(code, lang) {
						return code;
					}
				});
				data = marked(data);
			}
			callback( err, data );
		});
	},


	generateID: function() {
		return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).substr(-4);
	},


	buildError: function( code, error ){
		var error = hapi.error.badRequest( error );
		error.output.statusCode = code
		error.reformat();
		return error;
	},

	clone: function( obj ){
		return( JSON.parse( JSON.stringify( obj ) ));
	},


	isString: function (obj) {
		return typeof (obj) == 'string';
	},


	trim: function (str) {
		return str.replace(/^\s+|\s+$/g, "");
	},


	isArray: function (obj) {
		return obj && !(obj.propertyIsEnumerable('length'))
			&& typeof obj === 'object'
			&& typeof obj.length === 'number';
	}

};
