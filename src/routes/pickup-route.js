"use strict";

var controllers = require('../controllers'),
        validators = require('../validators'),
        config = require('config'),
        version = config.get('SERVER.API_VERSION');

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/api/' + version + '/pickup',
        config: {
            handler: controllers.PickupController.pickup,
            validate: validators.PickupValidator.pickup,
            description: 'Place a pickup',
            notes: 'Place a pickup request',
            tags: ['api', 'pickup'],
            auth: 'jwt'
        }
    });

    next();

};

/**
 * Exporting plugin
 * @type {{name: string, version: string}}
 */
exports.register.attributes = {
    name: 'pickup-route',
    version: '0.0.1'
};
