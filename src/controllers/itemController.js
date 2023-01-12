const itemService = require('../services/itemService');
const errorHandler = require('../utils/errorHandler');

const router = require('express').Router();

router.get('/:category/', async (req, res) => {
    try {
        const results = await itemService.getCategoryListings(req.params.category)
        return req.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})

router.get('/', async (req, res) => {
    const result = await itemService.getAllListings();
    return res.json(result)
})

router.post('/', async (req, res) => {
    const item = req.body;
    try {
        if(!req.token) throw new Error('You need to login first')

        item.owner = req.user.username
        const listedItem = await itemService.listItem(item);
        res.status(201).json(listedItem)
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})





module.exports = router;