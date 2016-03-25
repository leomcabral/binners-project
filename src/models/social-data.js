var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Social = new Schema({
    type: {
        type: String
    },
    username: {
        type: String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Social', Social);