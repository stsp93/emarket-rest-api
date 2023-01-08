const router = require('express').Router();
const usersController = require('./controllers/usersController')

router.get('/', (req, res) => {
    res.json({message: 'Router working'})
})

router.use('/users', usersController)

module.exports = router;