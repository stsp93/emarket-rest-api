const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'users working' })
})


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


module.exports = router;