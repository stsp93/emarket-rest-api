const itemService = require('../services/itemService');
const errorHandler = require('../utils/errorHandler');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const result = await itemService.getAllListings();
    res.json(result)
})

router.post('/', async (req, res) => {
    const item = req.body;
    try {
        const listedItem = await itemService.listItem(item);
        res.status(201).json(listedItem)
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})





module.exports = router;