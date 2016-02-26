var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Social = new Schema({
    type: {type: String},
    username: {type: String}
});

module.exports = mongoose.model('Social', Social);
