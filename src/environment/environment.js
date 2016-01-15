'use strict';

/**
 * Environment Setup
 * @description Checking NODE_ENV environment
 * @author Samuel Castro
 * @since 1/15/2016
 */
var config = require('config');

/**
 * Exporting environments
 * @type {{server, dataBase}}
 */
module.exports = function() {

	/**
	 * Process NODE_ENV environment
	 */
	if (!process.env.NODE_ENV) {
		throw new Error('Missing NODE_ENV environment. Try to run: "export NODE_ENV=development" for mac/linux or set your environment variables');
	}

	return {
		server : {
			host : config.get('SERVER.HOST'),
			port : config.get('SERVER.PORT')
		},
		dataBase: {
			uri  :  config.get('DATABASE.URI'),
			seed :  config.get('DATABASE.SEED')
		}
	};
}();


