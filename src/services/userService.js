const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const { promisify } = require('util')

// Promisifying JWT
const jwtSignAsync = promisify(jwt.sign)
const jwtVerifyAsync = promisify(jwt.verify)

const tokenBlacklist = new Set();

async function register(user) {
    return await User.create(user)
}

async function login(user) {
    // find user by email
    const existing = await User.findOne({ email: user.email }).collation({ locale: 'en', strength: 2 });

    // check username/password
    if (!existing || !await bcrypt.compare(user.password, existing.password)) throw new Error('Email or Password are incorrect')

    // sign jwt
    const payload = {
        username: existing.username,
        email: existing.email,
        _id: existing._id,
    }
    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '2d' });

    // return user with token
    return {
        username: existing.username,
        _id: existing._id,
        email: existing.email,
        token
    }

}

function logout(token) {
    tokenBlacklist.add(token);
}

async function verifyToken(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted')
    }

    return await jwtVerifyAsync(token, JWT_SECRET);
}

async function getUserListings(userId) {
    return await User.findById(userId).populate('ownListings', '-ownListings.owner')
}

async function saveListing(item) {
    const user = await User.findOne({username: item.owner}).collation({locale:'en', strength: 2})
    user.ownListings.push(item);
    user.save();
}

async function comment(comment, user) {
    const exsistingUser = await User.findOne({username: item.owner}).collation({locale:'en', strength: 2});
    exsistingUser.comments.push(comment);
    user.save();
}

module.exports = {
    register,
    login,
    logout,
    verifyToken,
    getUserListings,
    saveListing,
    comment
}