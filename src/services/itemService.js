const Item = require("../models/Item");

async function getAllListings() {
    return await Item.find({})
}

async function getCategoryListings(category) {
    return await Item.find({category});
}

async function listItem(item) {
   return await Item.create(item);
}

async function updateItem(id,user, changes) {
    const item = await Item.findById(id);
    if(item.owner !== user) throw new Error('You can edit only your own listings');

    Object.entries(changes).forEach((k, v) => item[k] = v);

    return await item.save();
}

module.exports = {
    getAllListings,
    listItem,
    getCategoryListings,
    updateItem
}