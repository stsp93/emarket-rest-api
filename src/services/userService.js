const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const { promisify } = require('util')

// Promisifying JWT
const jwtSignAsync = promisify(jwt.sign)
const jwtVerifyAsync = promisify(jwt.verify)

const tokenBlacklist = new Set();

async function register(user) {
    const newUser = await User.create(user)

    // sign jwt
    const payload = {
        username: newUser.username,
        email: newUser.email,
        _id: newUser._id,
    }
    const token = await jwtSignAsync(payload, JWT_SECRET, { expiresIn: '2d' });

    // return user with token
    return {
        username: newUser.username,
        _id: newUser._id,
        email: newUser.email,
        token
    }
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
    const user = await User.findOne({ username: item.owner }).collation({ locale: 'en', strength: 2 })
    user.ownListings.push(item);
    user.save();
}

async function comment(comment, username) {
    if (!comment.comment) throw new Error('Comment can\'t be empty')

    const exsistingUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    exsistingUser.comments.push(comment);
    exsistingUser.hasNewComments = true;
    exsistingUser.save();

}

async function getComments(username) {
    const exsistingUser = await User.findOne({ username })
        .collation({ locale: 'en', strength: 2 })
    exsistingUser.hasNewComments = false;
    await exsistingUser.save();

    return exsistingUser.comments;
}

async function delComment(username, commentId) {
    const user = await User.findOne({ username })
    .collation({ locale: 'en', strength: 2 });
    const commentIndex = user.comments.indexOf(c => c._id === commentId)
    user.comments.splice(commentIndex, 1);

    user.save();
}

module.exports = {
    register,
    login,
    logout,
    verifyToken,
    getUserListings,
    saveListing,
    comment,
    getComments,
    delComment
}