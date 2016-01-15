'use strict';

/**
 * Database setup
 * @description Configuring the MongoDB settings
 * @author Samuel Castro
 * @since 1/15/2016
 */
var mongoose = require('mongoose'),
	environment = require('../environment/environment.js'),
	inspect = require('eyes').inspector({styles: {all: 'magenta'}});

module.exports = function() {

	/**
	 * Creating a MongoDB connection
	 */
	mongoose.connect(environment.dataBase.uri);

	/**
	 * Listening Connected events
	 */
	mongoose.connection.once('connected', function() {
		inspect('[ Mongoose ] Connected on ' + environment.dataBase.uri.split(':')[1] + ' database.');
	});

	/**
	 * Listening Disconnected events
	 */
	mongoose.connection.on('disconnected', function() {
		inspect('[ Mongoose ] Disconnected from ' + environment.dataBase.uri.split(':')[1]);
	});

	/**
	 * Listening Error events
	 */
	mongoose.connection.on('error', function(error) {
		inspect('[ Mongoose ] Connection error: ' + error);
	});

	/**
	 * Listening process events
	 */
	process.on('SIGINT', function() { 
		mongoose.connection.close(function() {
			inspect('[ Mongoose ] Disconnected by the end of the application.');
			process.exit(0);
	 	}); 
	});
}
