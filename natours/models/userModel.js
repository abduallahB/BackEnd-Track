const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please tell us your Name'],
        unique: true,

    },
    email: {
        type: String,
        required: [true, 'a user must have email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, ' please provide a valid email']
    },
    photo: {
        type: String,


    },
    password: {
        type: String,
        required: [true, 'a user must have a password'],
        minlength: [8, 'characters must be more than 8 '],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm your password'],
        validate: {
            // this validator only works with SAVE and CREATE
            validator: function (pass) {
                return pass === this.password
            },
            message: 'passwords are not the same '

        }

    }

});

// create Encryption password middleware function 

userSchema.pre('save', async function (next) {

    // only run this function if the password modified
    if (!this.isModified('password')) return next();

    // hash password
    this.password = await bcrypt.hash(this.password, 12);

    // delete passwordConfirm  field 
    this.passwordConfirm = undefined;
})

// create a user module 
const User = mongoose.model('User', userSchema);
module.exports = User;