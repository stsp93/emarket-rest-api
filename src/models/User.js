const { Schema, model, Types } = require("mongoose");
const { SALT_ROUNDS } = require("../config/constants");
const bcrypt = require('bcrypt');
const { itemSchema } = require("./Item");
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter Username'],
        minLength: [3, 'Username should be at least 3 characters long'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter Email'],
        match: [emailPattern, 'Please add a valid email address.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        minLength: [3, 'Password should be at least 3 characters long']
    },
    ownListings: [
        {
            type: Types.ObjectId,
            ref: 'Item'
        }
    ],
    hasNewComments: {
        type: Boolean,
        default: false,
    },
    comments: [
        {
            item: {
                type: Types.ObjectId,
                ref: 'Item'
            },
            username: {
                type: String
            },
            comment: {
                type: String,
            }
        }
    ]
})

// Hashing password before saving in the DB
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    }

    next()
})

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

exports.User = User;