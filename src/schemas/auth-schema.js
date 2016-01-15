"use strict";

/**
 * Auth Schema
 * @description Defining the auth schema
 * @author Samuel Castro
 * @since 1/13/2016
 */

var Joi = require('joi');

function AuthSchema(){
	this.schema = {
		accessToken: Joi.string()
	};
}

module.exports = AuthSchema;
