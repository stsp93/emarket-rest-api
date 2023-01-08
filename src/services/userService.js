const User = require("../models/User");

async function register(user) {
    await User.create(user)
}

module.exports = {
    register
}