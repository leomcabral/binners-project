"use strict";

/**
 * Auth Validator
 * @description Defining the authentication validator
 * @author Samuel Castro
 * @since 1/13/2016
 */
var schemas = require('../schemas');

function AuthValidator(){}

AuthValidator.prototype = (function(){
	var schema = new schemas.UserSchema().schema;
	var authSchema = new schemas.AuthSchema().schema;
	return {
		auth: {
			payload: {
				email: schema.email.required().description('User email').example('samuelcastrosilva@gmail.com'),
				password: schema.password.required().description('User password').example('123123123')
			}
		},
		getAuth: {
			headers: schema.authorization
		},
		facebookAuth: {
			params: {
				accessToken: authSchema.accessToken.required().description('Social Authorization Parameter')
			}
		},
		forgot: {
			params: {
				email: schema.email.required().description('User email').example('samuelcastrosilva@gmail.com')
			}
		},
		resetPassword: {
			params: {
				token: authSchema.accessToken.required().description('Reset Token')
			}
		},
		doResetPassword: {
			params: {
				token: authSchema.accessToken.required().description('Reset Token')
			},
			payload: {
				password: schema.password.required().description('New Password')
			}
		}
	};
})();

module.exports = new AuthValidator();
