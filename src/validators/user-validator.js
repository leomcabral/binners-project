"use strict";

/**
 * User Validator
 * @description Definig the user validator
 * @author Samuel Castro
 * @since 1/13/2016
 */
var Joi = require('joi'),
	schemas = require('../schemas');

function UserValidator(){}

UserValidator.prototype = (function() {
	var schema = new schemas.UserSchema().schema;
	return {
		find: {
			query: {
				page: Joi.number().integer().optional().description('Page number').example(2),
				search: Joi.string().optional().description('Search query').example('Samuel Castro')
			},
			headers: schema.authorization
		},
		findByID: {
			params: {
				_id: schema._id.required()
			},
			headers: schema.authorization
		},
		create: {
			payload: {
				email: schema.email.required().description('User email').example('samuelcastrosilva@gmail.com'),
				password: schema.password.required().description('User password').example('samuelcastro'),
				phone: schema.phone.optional().description('User phone').example('55 37 9999-9999'),
				active: schema.active.optional().description('User is active').example(true)
			}
		},
		update: {
			payload: {
				email: schema.email.optional().description('User email').example('samuelcastrosilva@gmail.com'),
				password: schema.password.optional().description('User password').example('samuelcastro'),
				phone: schema.phone.optional().description('User phone').example('55 37 9999-9999'),
				active: schema.active.optional().description('User is active').example(true)
			},
			params: {
				_id: schema._id.required()
			},
			headers: schema.authorization
		},
		delete: {
			params: {
				_id: schema._id.required()
			},
			headers: schema.authorization
		}
	};
})();

module.exports = new UserValidator();
