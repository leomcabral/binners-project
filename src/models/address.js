var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Address = new Schema({
    homeAddress: {type: Boolean, default: true},
    street: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    location: {
        type: {type: String},
        coordinates: [Number]
    }
});

module.exports = mongoose.model('Address', Address);
