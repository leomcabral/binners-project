"use strict";

/**
 * Log Plugin
 * @description This plugin creates some important logs in our server
 * @author Samuel Castro
 * @since 1/14/2016
 */
var good = require('good');
var goodConsole = require('good-console');

/**
 * Exporting plugin
 * @param server
 * @param options
 * @param next
 */
exports.register = function(server, options, next) {
    server.register({
        register: good,
        options: {
            reporters: [
                new goodConsole({
                    ops: '*',
                    response: '*',
                    log: '*',
                    error: '*'
                })
            ]
        }
    }, next);
};

/**
 * Registering plugin
 * @type {{name: string, version: string}}
 */
exports.register.attributes = {
    name: 'log-plugin',
    version: '0.0.1'
};
