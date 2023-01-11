const Item = require("../models/Item");

async function getAllListings() {
    return await Item.find({})
}

async function listItem(item) {
   return await Item.create(item);
}

module.exports = {
    getAllListings,
    listItem
}