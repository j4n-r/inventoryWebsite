const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	name:{ type: String, required: true, maxLength: 100 },
	email: {type: String},
	username:{type: String, minLength: 3, maxLenght: 10, index: {unique: true}},
	password:{type: String, minLength: 8},
	img_url: { type: String, optional: true},
});



  UsersSchema.virtual("url").get(function () {
	return "/user/" + this._id;
  });


  UsersSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


// Compile model from schema
module.exports = mongoose.model("Users", UsersSchema);


