"use strict";

/**
 * Social Network Connection
 * @description This plugin will create a social signIn/signUp like facebook and so on
 * @author Samuel Castro
 * @since 1/14/2016
 */
var config = require('config');

/**
 * Exporting plugin
 * @param server
 * @param options
 * @param next
 */
exports.register = function(server, options, next) {

	/**
	 * Register bell with the server
	 */
	server.register(require('bell'), function (err) {
		if (err) throw err;

		var social = config.get('SOCIAL');

		/**
		 * Declare an authentication strategy using the bell
		 * scheme with the name of the provider, cookie encryption
		 * password, and the OAuth client credentials.
		 */
		for(var provider in social) {
			server.auth.strategy(provider.toLowerCase(), 'bell', {
				provider: provider.toLowerCase(),
				password: config.get('TOKEN.SECRET'),
				clientId: social[provider].CLIENT_ID,
				clientSecret: social[provider].CLIENT_SECRET,
				isSecure: social[provider].IS_SECURE // Terrible idea but required if not using HTTPS
			});
		}
	});
  next();
};

/**
 * Registering plugin
 * @type {{name: string, version: string}}
 */
exports.register.attributes = {
  name: 'social-plugin',
  version: '0.0.1'
};
