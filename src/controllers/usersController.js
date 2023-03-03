const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

const router = require('express').Router();

router.post('/register', async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user)
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

router.get('/comments', async (req, res) => {
    try {
        const comments = await userService.getComments(req.user.username);
        return res.json(comments);
    } catch(error) {
        console.log(error);
        res.status(401).json(errorHandler(error))
    }
})

router.delete('/comments/:id', async (req, res) => {
    try {
        await userService.delComment(req.user.username, req.params.id);

        res.status(204).json({});
    }catch(error) {
        console.log(error);
        res.status(403).json(errorHandler(error))
    }
})


module.exports = router;