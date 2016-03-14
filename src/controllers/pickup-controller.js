"use strict";

/**
 * Pickup Controller
 *
 * @description This controller has all functions/methods for pickup proccess.
 *
 * @author Leonardo Cabral <leocmabral@gmail.com>
 *
 * @since 2/29/2016
 */
var Boom = require('boom'),
        jwt = require('jsonwebtoken'),
        config = require('config'),
        models = require('../models'),
        errors = require('../lib/utilities').getErrorsCode(),
        moment = require('moment-timezone');

function PickupController() {}

PickupController.prototype = (function () {

    var Pickup = models.Pickup;

    return {

        pickup: function (request, reply) {
            var payload = request.payload;

            var newPickup = {
                requester: payload.requester,
                address: payload.address,
                time: payload.time,
                instructions: payload.instructions,
                items: payload.items
            };

            Pickup.create(newPickup).then(function (pickup) {

                reply(pickup);

            }, function (error) {
                reply(Boom.badRequest(error));
            });

        },
        list: function (request, reply) {
            var curDate = moment().tz('America/Vancouver');
            var last6Month = curDate.clone().subtract(6, 'months');

            Pickup.find({ time: {"$gte": last6Month} }).exec()
                    .then(function (pickups) {
                        reply(pickups);
                    });
        }

    };

})();

module.exports = new PickupController();
