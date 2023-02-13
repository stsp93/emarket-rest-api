const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const user = await userService.register(req.body);
        const {username, email, _id} = user;
        res.status(201).json({username, email, _id})
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await userService.login(req.body);
        return res.json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})

router.get('/logout', (req, res) => {
    userService.logout(req.token);
    res.status(204).end();
})

router.get('/profile', async (req, res) => {
    try {
        const {ownListings:profile} = await userService.getUserListings(req.user._id)
        return res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(401).json(errorHandler(error))
    }
})


module.exports = router;