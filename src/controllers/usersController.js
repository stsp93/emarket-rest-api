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

router.get('/replies', async (req, res) => {
    try {
        const replies = await userService.getReplies(req.user.username);
        return res.json(replies);
    } catch(error) {
        console.log(error);
        res.status(401).json(errorHandler(error))
    }
})

router.delete('/replies/:id', async (req, res) => {
    try {
        await userService.delReply(req.user.username, req.params.id);

        res.status(204).json({});
    }catch(error) {
        console.log(error);
        res.status(403).json(errorHandler(error))
    }
})

router.post('/reply',async (req, res) => {
    // Receives reply and recipient
    const {reply, username} = req.body
    try {
        if (!req.token) throw { message: 'You need to login first', status: 403 }
        const newReply = {
            username: req.user.username,
            reply
        }
        await userService.reply(newReply, username)
      return res.json({reply}) 
    }catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})



module.exports = router;