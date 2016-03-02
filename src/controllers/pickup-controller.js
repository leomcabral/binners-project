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
        errors = require('../lib/utilities').getErrorsCode();

function PickupController() {}

PickupController.prototype = (function () {

    var Pickup = models.Pickup;

    return {

        pickup: function (request, reply) {
            var payload = request.payload;

            var newPickup = {
                requester: payload.requester,
                address: payload.address,
                startTime: payload.timeInterval.start,
                endTime: payload.timeInterval.end,
                instructions: payload.instructions,
                items: payload.items
            };

            Pickup.create(newPickup).then(function (pickup) {

                reply(pickup);

            }, function (error) {
                reply(Boom.badRequest(error));
            });

        }

    };

})();

module.exports = new PickupController();
