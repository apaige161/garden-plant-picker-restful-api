//single plant model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

//create schema
const UserSchema = mongoose.Schema({
    
    fullName: {
        type: String,
        required: 'Name can\'t be empty',
        minlength: [4, 'Name must be at least 3 characters long']
    },
    zone: {
        type: String,
        required: 'Zone can\'t be empty'
    },
    email: {
        type: String,
        required: 'Eamil can\'t be empty',
        unique: true,
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be at least 4 characters long']
    },

    saltSecret: {
        type: String
    }
});

//custom validation for email
UserSchema.path('email').validate((val) => {
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(val);
}, 'Invalid email.')


/***
 * encrypt password
 */
//events
//invoked before the save function
UserSchema.pre('save', function(next) {
    //salt password
    bcrypt.genSalt(10, (err, salt) => {
        //hash password
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
    
})

//export
module.exports = mongoose.model('User', UserSchema);