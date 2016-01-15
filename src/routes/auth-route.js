"use strict";

/**
 * Authentication Route
 * @description Defining all routes for auth process
 * @author Samuel Castro
 * @since 1/14/2016
 */
var controllers = require('../controllers'),
    validators = require('../validators');

exports.register = function(server, options, next) {

  /**
   * @api {post} /api/v1.0/auth
   * @apiName LogIn aplication
   * @apiGroup Users
   *
   * @apiParam {String} email
   * @apiParam {String} password
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *       {
   *	   		__v: 0
   *			userName: "Samuel Castro"
   *			email: "samuelcastrosilva@gmail.com"
   *			password: "$2a$08$ewJwmQli/YWOThtMlcR3hubOKxaYr4/nCFy1.TqsCxuxpwud98T.q"
   *			_id: "55ae85d9c5e6883b23dd1d71"
   *			active: true
   *		 }
   *
   * @apiError InternalServerError: Some issue occurs when try to create user.
   * @apiError Unprocessable Entity: Not allowed to create user.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "statusCode": 500,
   *       "error": "Internal Server Error",
   *       "message": "500 Internal Server Error"
   *     }
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "statusCode": 422,
   *       "error": "Unprocessable Entity",
   *       "message": "Not authorized for query on soundbitz_dev.users"
   *     }
   */
  server.route({
    method: 'POST',
    path: '/api/v1.0/auth',
    config: {
      handler:  controllers.AuthController.auth,
      validate: validators.AuthValidator.auth,
      description: 'Application login',
      notes: 'SignIn Process',
      tags: ['api']
    }
  });

  /**
   * @api {post} /api/v1.0/auth/facebook
   * @apiName Facebook SignIn
   * @apiGroup Users
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *       {
   *	   		__v: 0
   *			userName: "Samuel Castro"
   *			email: "samuelcastrosilva@gmail.com"
   *			password: "$2a$08$ewJwmQli/YWOThtMlcR3hubOKxaYr4/nCFy1.TqsCxuxpwud98T.q"
   *			_id: "55ae85d9c5e6883b23dd1d71"
   *			active: true
   *		 }
   *
   * @apiError InternalServerError: Some issue occurs when try to create user.
   * @apiError Unprocessable Entity: Not allowed to create user.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "statusCode": 500,
   *       "error": "Internal Server Error",
   *       "message": "500 Internal Server Error"
   *     }
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "statusCode": 422,
   *       "error": "Unprocessable Entity",
   *       "message": "Not authorized for query on soundbitz_dev.users"
   *     }
   */
  server.route({
    method: 'GET',
    path: '/api/v1.0/auth/facebook/',
    config: {
      handler:  controllers.AuthController.isAuthenticated,
      description: 'Facebook login',
      notes: 'Facebook SignIn Process',
      tags: ['api'],
      auth: 'facebook'
    }
  });

  /**
   * @api {post} /api/v1.0/auth/facebook/{access_token}
   * @apiName Facebook SignIn
   * @apiGroup Users
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *       {
   *	   		token: ""eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiOTE3MDQ1NzMxNjk1Mzg3IiwiaWF0IjoxNDM4NzAyODE3LCJleHAiOjE0Mzg3ODkyMTd9.kbPYvzngO-RPBlahsyyIIxiAzeDCEjfqZi80SXf9sN0""
   *			user: {
   *		      email: "samuelcastrosilva@gmail.com",
   *		      id: 1234567899
   *		    },
   *		    social: true
   *	   }
   *
   * @apiError InternalServerError: Some issue occurs when try to create user.
   * @apiError Unprocessable Entity: Not allowed to create user.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "statusCode": 500,
   *       "error": "Internal Server Error",
   *       "message": "500 Internal Server Error"
   *     }
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "statusCode": 422,
   *       "error": "Unprocessable Entity",
   *       "message": "Not authorized for query on soundbitz_dev.users"
   *     }
   */
  server.route({
    method: 'GET',
    path: '/api/v1.0/auth/facebook/{accessToken}',
    config: {
      handler:  controllers.AuthController.facebookAuth,
      validate: validators.AuthValidator.facebookAuth,
      description: 'Facebook login based on Mobile SDK',
      notes: 'Facebook SignIn Process - Mobile SDK',
      tags: ['api']
    }
  });

  /**
   * @api {get} /api/auth
   * @apiName  Get
   * @apiGroup Auth
   * @apiDescription Get information about the current auth token
   *
   * @apiHeader {String} Authorization Token com o JWT
   */
  server.route({
    method: 'GET',
    path: '/api/v1.0/auth',
    config: {
      handler : controllers.AuthController.getAuth,
      validate: validators.AuthValidator.getAuth,
      description: 'Get auth credentials',
      notes: 'Getting credentials',
      tags: ['api'],
      auth: 'jwt'
    }
  });

  /**
   * @api {get} /api/auth
   * @apiName  Get
   * @apiGroup Auth
   * @apiDescription Get information about the current auth token
   *
   * @apiHeader {String} Authorization Token com o JWT
   */
  server.route({
    method: 'GET',
    path: '/api/v1.0/auth/forgot/{email}',
    config: {
      handler : controllers.AuthController.forgot,
      validate: validators.AuthValidator.forgot,
      description: 'Forgot password',
      notes: 'Forgot password',
      tags: ['api']
    }
  });

  /**
   * @api {get} /api/auth
   * @apiName  Get
   * @apiGroup Auth
   * @apiDescription Get information about the current auth token
   *
   * @apiHeader {String} Authorization Token com o JWT
   */
  server.route({
    method: 'GET',
    path: '/api/v1.0/auth/reset/{token}',
    config: {
      handler : controllers.AuthController.resetPassword,
      validate: validators.AuthValidator.resetPassword,
      description: 'Updating password',
      notes: 'Updating password',
      tags: ['api']
    }
  });

  /**
   * @api {get} /api/auth
   * @apiName  Get
   * @apiGroup Auth
   * @apiDescription Get information about the current auth token
   *
   * @apiHeader {String} Authorization Token com o JWT
   */
  server.route({
    method: 'POST',
    path: '/api/v1.0/auth/reset/{token}',
    config: {
      handler : controllers.AuthController.doResetPassword,
      validate: validators.AuthValidator.doResetPassword,
      description: 'Updating password',
      notes: 'Updating password',
      tags: ['api']
    }
  });

  next();
};

/**
 * Registering routes
 * @type {{name: string, version: string}}
 */
exports.register.attributes = {
  name: 'auth-route',
  version: '0.0.1'
};
