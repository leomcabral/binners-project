"use strict";

/**
 * Binners Project App
 * @description Starting the Binners Project app
 * @author Samuel Castro
 * @since 1/13/2016
 */
var server = require('./src/server');

/**
 * Starting server
 */
server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
});
