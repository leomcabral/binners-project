var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	Promise = require("bluebird"),
    bcrypt = require('bcryptjs');

/**
 * Creating user schema
 */
var User = new Schema({
	name: { type: String },
	email: { type: String, required: '{PATH} is required!', unique: true },
	password: { type: String },
	phone: { type: String },
	address: { type: String },
	homeAddress: { type: Boolean },
	active: { type:Boolean, default: true },
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

User.plugin(uniqueValidator, { message: 'Expected {PATH}: {VALUE} to be unique.' });

/**
 * Generating password hashed
 * @param pwd
 * @returns {*}
 */
User.methods.doHash = function(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
};

User.methods.doHashAsync = function(value, cb) {
	bcrypt.genSalt(8, function(err, salt) {
		bcrypt.hash(value, salt, function(err, hash) {
			cb(err, hash);
		});
	});
};

User.methods.doHashReset = function(cb) {
	crypto.randomBytes(256, function(err, buf) {
		console.log(buf.toString('hex'));
		cb(err, buf.toString('hex'));
	});
};

/**
 * Validating password
 * @param pwd
 * @returns {*}
 */
User.methods.validatePassword = function(pwd) {
    return bcrypt.compareSync(pwd, this.password);
};

module.exports = mongoose.model('User', User);

