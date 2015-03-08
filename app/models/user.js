var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    firstName   : String,
    lastName    : String,
    phone       : Number,
    email       : String,
    password    : String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

// create the models
module.exports = mongoose.model('User', userSchema);
