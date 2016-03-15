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
        Promise = require('bluebird'),
        fs = Promise.promisifyAll(require('fs')),
        moment = require('moment-timezone'),
        inspect = require('eyes').inspector({styles: {all: 'green'}}),
        uuid = require('node-uuid');

var pickupFolder = config.get("SERVER.UPLOAD_FOLDER") + "/pickups/";

function PickupController() {}

PickupController.prototype = (function () {

    var Pickup = models.Pickup;

    return {
        pickup: function (request, reply) {
            var payload = request.payload;
            var userId = request.auth.credentials.user;

            var newPickup = {
                requester: payload.requester,
                address: payload.address,
                time: payload.time,
                instructions: payload.instructions,
                items: payload.items
            };

            Pickup.create(newPickup).then(function (pickup) {

                var ret = pickup.toObject();
                var sInfo = request.server.info;
                ret.photoUploadURL = sInfo.protocol + '://' + sInfo.host + ':'+ sInfo.port + '/api/' + config.get('SERVER.API_VERSION') + '/pickups/' + userId + '/photos';

                reply(ret);

            }, function (error) {
                reply(Boom.badRequest(error));
            });

        },
        list: function (request, reply) {
            var curDate = moment().tz('America/Vancouver');
            var last6Month = curDate.clone().subtract(6, 'months');
            var userId = request.auth.credentials.user;

            Pickup.find({requester: userId, time: {"$gte": last6Month}}).exec()
                    .then(function (pickups) {
                        reply(pickups);
                    });
        },
        photoUpload: function (request, reply) {
            var userId = request.auth.credentials.user;

            var data = request.payload;
            data.userId = userId;

            Promise.resolve(data)
                    .then(createFolderForUserIfNotPresent)
                    .then(uploadFile)
                    .then(function (data) {
                        var sInfo = request.server.info;

                        reply({
                            status: '200',
                            msg: 'File uploaded succefully',
                            fileURL: sInfo.protocol + '://' + sInfo.host + ':'+ sInfo.port + '/api/' + config.get('SERVER.API_VERSION') + '/pickups/' + data.userId + '/photos/' + data.generatedFilename
                        });
                    })
                    .catch(function (err) {
                        reply(Boom.badRequest(err));
                    });

        }

    };

})();

var createFolderForUserIfNotPresent = function (data) {
    var userPickupFolder = pickupFolder + '/' + data.userId;
    data.userPickupFolder = userPickupFolder;

    return new Promise(function (resolve, reject) {
        fs.stat(userPickupFolder, function (err, stat) {
            if (err) {
                inspect('[ Pickup ] Folder "' + userPickupFolder + '" not found. It will be created!');
                fs.mkdirSync(userPickupFolder);
                resolve(data);
            } else {
                inspect('[ Pickup ] Folder "' + userPickupFolder + '" already exists');
                resolve(data);
            }
        });
    });
};

var uploadFile = function (data) {
    var requestFilename = data.file.hapi.filename;
    var filename = uuid.v4 + '.' + requestFilename.substring(requestFilename.lastIndexOf('.') + 1, requestFilename.length);
    var filePath = data.userPickupFolder + '/' + filename;
    data.filePath = filePath;
    data.generatedFilename = filename;

    return new Promise(function (resolve, reject) {
        var file = fs.createWriteStream(filePath);

        file.on('error', function (err) {
            reject(err);
        });

        data.file.pipe(file);

        data.file.on('end', function (err) {
            resolve(data);
        });
    });
};

module.exports = new PickupController();
