"use strict";

/**
 * User Schema
 * @description Defining the user schema
 * @author Samuel Castro
 * @since 1/13/2016
 */

var Joi = require('joi');

function UserSchema(){
	this.schema = {
		_id: Joi.string(),
		email: Joi.string().email(),
		userName: Joi.string(),
        password: Joi.string(),
        name: Joi.string(),
        phone: Joi.string(),
        active: Joi.boolean().default(true),
		authorization: Joi.object({
			'Authorization': Joi.string().description('Authorization Token')
		}).unknown()
	};
}

module.exports = UserSchema;
