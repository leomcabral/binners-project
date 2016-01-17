"use strict";

/**
 * JWT Plugin
 * @description This plugin creates a validation token based on JSON Web Token
 * @author Samuel Castro
 * @since 1/14/2016
 */
var jwt = require('jsonwebtoken'),
	config = require('config'),
	Boom = require('boom');

/**
 * Exporting plugin
 * @param server
 * @param options
 * @param next
 */
exports.register = function(server, options, next) {
	server.auth.scheme('jwt', function() {
		return {
			authenticate: function(request, reply) {
        		var req = request.raw.req;
        		var headers = req.headers;

        		if(!headers.authorization)
          			return reply(Boom.forbidden('403 Forbidden'));

        		var token = headers.authorization.replace('Bearer ', '');
        		
        		jwt.verify(token, config.get('TOKEN.SECRET'), function(err, user) {
          			if(err)
            			return reply(Boom.unauthorized('401 Unauthorized'));

          			reply.continue({
            			credentials: user
          			});
        		});
        	}
		}
	});

  server.auth.strategy('jwt', 'jwt');
  next();
};

/**
 * Registering plugin
 * @type {{name: string, version: string}}
 */
exports.register.attributes = {
  name: 'jwt-plugin',
  version: '0.0.1'
};
