const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({message: 'users working'})
})


router.post('/register',(req, res) => {

})

router.post('/login',(req, res) => {

})

router.post('/logout',(req, res) => {

})


module.exports = router;