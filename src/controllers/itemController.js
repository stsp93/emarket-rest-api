const itemService = require('../services/itemService');
const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');
const { CATEGORIES } = require('../config/constants');

const router = require('express').Router();

router.get('/categories', (req, res) => {
    res.json(CATEGORIES);
})

router.get('/', async (req, res, next) => {
    const { q: query, cat: category } = req.query;
    if (category && !Object.keys(CATEGORIES).includes(category)) return next();
    const results = await itemService.getListings(query, category);
    return res.json(results)
})

router.post('/', async (req, res) => {
    const item = req.body;
    try {
        if (!req.token) throw { message: 'You need to login first', status: 403 }

        item.owner = req.user.username
        const listedItem = await itemService.listItem(item);
        await userService.saveListing(listedItem)
        res.status(201).json(listedItem)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})





router.get('/:id', async (req, res) => {
    try {
        const result = await itemService.getItemDetails(req.params.id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(errorHandler(error));
    }
})

router.put('/:id', async (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    const user = req?.user.username;
    try {
        const editedItem = await itemService.updateItem(id, user, changes);
        res.json(editedItem)
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.user?.username;
    try {
        await itemService.deleteItem(id, user);
        res.status(204).json({})
    } catch (error) {
        console.log(error);
        res.status(error.status || 400).json(errorHandler(error));
    }
})






module.exports = router;