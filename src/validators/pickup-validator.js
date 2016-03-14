"use strict";

var Joi = require('joi'),
        schemas = require('../schemas');

function PickupValidator() {}

PickupValidator.prototype = (function () {
    var schema = new schemas.PickupSchema().schema;

    return {
        pickup: {
            payload: {
                requester: schema.requester.required(),
                address: schema.address,
                time: schema.time.required(),
                instructions: schema.instructions.optional(),
                items: schema.items.required()
            },
            headers: schema.authorization.required()
        },
        list: {
            query: {
                user: schema.requester.required()
            },
            headers: schema.authorization.required()
        }
    };
})();

module.exports = new PickupValidator();
