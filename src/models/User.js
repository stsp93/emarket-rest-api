const { Schema, model } = require("mongoose");
const { SALT_ROUNDS } = require("../config/constants");

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
        
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        minLength: [3, 'Password should be at least 3 characters long']
    }
})


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    next()
})  

const User = model('User', userSchema);

module.exports = User;