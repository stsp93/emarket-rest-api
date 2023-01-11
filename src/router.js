const router = require('express').Router();
const usersController = require('./controllers/usersController')
const itemController = require('./controllers/itemController')

router.get('/', (req, res) => {
    res.json({message: 'Router working'})
})

router.use('/users', usersController)
router.use('/items', itemController)

module.exports = router;