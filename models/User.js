//single plant model
const mongoose = require('mongoose');

//create schema
const UserSchema = mongoose.Schema({
    
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    passwordSalt: {
        type: String
    }
});

//export
module.exports = mongoose.model('User', UserSchema);