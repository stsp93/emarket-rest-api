const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'users working' })
})


router.post('/register', async (req, res) => {
    const user = req.body;
    try {
        await userService.register(user);
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error))
    }
})

router.post('/login', (req, res) => {

})

router.post('/logout', (req, res) => {

})


module.exports = router;