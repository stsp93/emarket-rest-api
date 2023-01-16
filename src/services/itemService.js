const Item = require("../models/Item");

async function getAllListings() {
    return await Item.find({})
}

async function getCategoryListings(category) {
    return await Item.find({category});
}

async function getItemDetails(id) {
    return await Item.findById(id);
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

async function deleteItem(id,user, changes) {
    const item = await Item.findById(id);
    if(item.owner !== user) throw new Error('You can delete only your own listings');

    return await item.delete();
}


module.exports = {
    getAllListings,
    listItem,
    getCategoryListings,
    updateItem,
    deleteItem,
    getItemDetails,
}