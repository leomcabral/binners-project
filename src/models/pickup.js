var mongoose = require('mongoose'),
        uniqueValidator = require('mongoose-unique-validator'),
        Schema = mongoose.Schema,
        //Address = require('./address'),
        Promise = require("bluebird"),
        _ = require('underscore');

/**
 * Items subdocument for {@link Pickup}.
 * @type Schema
 */
var itemsSchema = new Schema({
    type: {type: String},
    packageSize: {type: String},
    quantity: {type: Number}
});

/**
 * Pickup schema.
 *
 * @type Schema
 */
var Pickup = new Schema({
    requester: {type: Schema.Types.ObjectId, ref: 'User'},
    address: {
        street: {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: String},
        location: {
            type: {type: String},
            coordinates: [Number]
        }
    },
    startTime: {type: Date},
    endTime: {type: Date},
    instructions: {type: String},
    items: [itemsSchema]
});


module.exports = mongoose.model('Pickup', Pickup);

