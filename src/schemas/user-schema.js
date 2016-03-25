"use strict";
/**
 * User Schema
 * @description Defining the user schema
 * @author Samuel Castro
 * @since 1/13/2016
 */
var Joi = require('joi');

function UserSchema() {
    this.schema = {
        _id: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        name: Joi.string(),
        phone: Joi.string(),
        active: Joi.boolean().default(true),
        addresses: Joi.array().items(Joi.object({
            homeAddress: Joi.boolean().default(false),
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
            location: Joi.object({
                type: Joi.string(),
                coordinates: Joi.array().items(Joi.number())
            })
        })),
        social: Joi.array().items(Joi.object({
            type: Joi.string().required().valid('facebook', 'google', 'twitter').description('Social authentication service identificator'),
            username: Joi.string().required()
        })),
        authorization: Joi.object({
            'Authorization': Joi.string().description('Authorization Token')
        }).unknown()
    }, {
        timestamps: true
    };
}
module.exports = UserSchema;