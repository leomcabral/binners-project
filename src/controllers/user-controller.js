'use strict';

/**
 * User Controller
 * @description The user controller has all functions/method to save/get/remove/update users
 * @author Samuel Castro
 * @since 1/15/2016
 */
var Boom = require('boom'),
        jwt = require('jsonwebtoken'),
        config = require('config'),
        errors = require('../lib/utilities').getErrorsCode(),
        models = require('../models');

function UserController() {}

UserController.prototype = (function () {

    var User = models.User;

    return {
        /**
         * Find all Users
         * @param request
         * @param reply
         * @error reply a Boom object with a bad request 400 status
         * @errorExample
         * {
         *   "statusCode": 400,
         *   "error": "Bad Request",
         *   "message": "invalid query"
         * }
         */
        find: function (request, reply) {
            User.find().exec().then(
                    function (users) {
                        reply(users);
                    },
                    function (error) {
                        reply(Boom.badData(error.message));
                    }
            );
        },
        /**
         * Find user by id
         * @param request
         * @param reply
         */
        findByID: function (request, reply) {
            User.findById(request.params._id).exec().then(
                    function (user) {
                        if (user)
                            reply(user);
                        else {
                            var err = Boom.badData('', errors.USER_NOT_FOUND);
                            err.output.payload.details = err.data;
                            reply(err);
                        }
                    },
                    function (error) {
                        reply(Boom.badData(error.message));
                    }
            );
        },
        /**
         * Create a new user
         * @param request
         * @param reply
         */
        create: function (request, reply) {
            var UserHash = new models.User();
            request.payload.password = UserHash.doHash(request.payload.password);
            User.create(request.payload).then(
                    function (user) {

                        var token = jwt.sign(
                                {user: user._id},
                                config.get('TOKEN.SECRET'),
                                {expiresInMinutes: config.get('TOKEN.OPTIONS.EXPIRES_IN_MINUTES')}
                        );

                        reply(
                                {
                                    token: token,
                                    user: {
                                        id: user._id,
                                        email: user.email,
                                        phone: user.phone,
                                        active: user.active
                                    }
                                }
                        );
                    },
                    function (error) {
                        var err = Boom.badRequest(error, errors.DUPLICATED_USER);
                        err.output.payload.details = err.data;
                        reply(err);
                    }
            );
        },
        /**
         * Update user
         * @param request
         * @param reply
         */
        update: function (request, reply) {
            var UserHash = new models.User();

            if (request.payload.password) {
                request.payload.password = UserHash.doHash(request.payload.password);
            }

            User.findByIdAndUpdate(request.params._id, request.payload).exec().then(
                    function (user) {
                        if (user)
                            reply(user);
                        else
                            reply(Boom.notFound('User not found.'))
                    },
                    function (error) {
                        reply(Boom.badData(error.message));
                    }
            );
        },
        /**
         * Remove user
         * @param request
         * @param reply
         */
        delete: function (request, reply) {
            console.log(request.params);
            User.remove({_id: request.params._id}).then(
                    function (user) {
                        reply({
                            success: true
                        });
                    },
                    function (error) {
                        reply(Boom.badData(error.message));
                    }
            );
        }
    }
})();

module.exports = new UserController();
