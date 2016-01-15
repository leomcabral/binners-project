"use strict";

/**
 * Documentation Route
 * @description Creating all documentation routes
 * @author Samuel Castro
 * @since 1/14/2016
 */
var controllers = require('../controllers');

exports.register = function(server, options, next) {

  /**
   * @api {get} /api/v1.0/doc Request DOC information
   * @apiSampleRequest http://example.com/api/v1.0/doc
   * @apiName Doc
   *
   * @apiSuccess (200) Returns the api HTML page.
   *
   * @apiSuccessExample {html} Success-Response:
   *     HTTP/1.1 200 OK
   *
   * @apiError 403 Forbidden.
   * @apiError 401 Unauthorized.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 403 Forbidden
   *     {
   *       "statusCode": 403",
   *       "error": "Forbidden",
   *       "message": "403 Forbidden"
   *     }
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "statusCode": 401",
   *       "error": "Unauthorized",
   *       "message": "401 Unauthorized"
   *     }
   */
  server.route({
    method: 'GET',
    path: '/api/v1.0/doc',
    config: {
      handler: controllers.DocController.index
    }
  });

  /**
   * @api {get} / Request DOC resources
   * @apiSampleRequest http://example.com/css/style.css
   * @apiName Doc
   */
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './src/public',
        listing: false,
        index: true
      }
    }
  });

  next();
};

/**
 * Registering routes
 * @type {{name: string, version: string}}
 */
exports.register.attributes = {
  name: 'doc-route',
  version: '0.0.1'
};
