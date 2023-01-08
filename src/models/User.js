const { Schema, model } = require("mongoose");
const { SALT_ROUNDS } = require("../config/constants");
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter Username'],
        minLength: [3, 'Username should be at least 3 characters long'],
        unique : [true, 'Username already exist']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email'],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',
          ]
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        minLength: [3, 'Password should be at least 3 characters long']
    }
})

// Hashing password before saving in the DB
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    next()
})  

const User = model('User', userSchema);

module.exports = User;