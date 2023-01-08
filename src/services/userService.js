const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const {promisify} = require('util')

const jwtSignAsync = promisify(jwt.sign) // Promisifying JWT

async function register(user) {
    return await User.create(user)
}

async function login(user) {
    // find user by email
    const existing = await User.findOne({ email: new RegExp(`^${user.email}$`,'i') });

    // check username/password
    if (!existing || !await bcrypt.compare(user.password, existing.password)) throw new Error('Email or Password are incorrect')

    // sign jwt
    const payload = {
        username: existing.username,
        email: existing.email,
        _id: existing._id,
    }
    const token = await jwtSignAsync(payload,JWT_SECRET,{expiresIn:'2d'});
    console.log(token);

    // return user with token
    return {
        username: existing.username,
        email: existing.email,
        _id: existing._id,
        token
    }

}

module.exports = {
    register,
    login
}