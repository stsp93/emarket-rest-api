const Item = require("../models/Item");

async function getListings(query = '', category) {
    let findQuery = {}
    if(category) findQuery.category = category
    if(query) findQuery.title = new RegExp(query, 'i')
    

    return await Item.find(findQuery).collation({ locale: 'en', strength: 2 })
}


async function getItemDetails(id) {
    return await Item.findById(id);
}

async function listItem(item) {
    return await Item.create(item);
}

async function updateItem(id, user, changes) {
    const item = await Item.findById(id);
    console.log('service');
    console.log(changes);
    if (item.owner !== user) throw { message: 'You can edit only your own listings', status: 403 };

    Object.entries(changes).forEach(([k, v]) => item[k] = v);


    return await item.save();
}

async function deleteItem(id, user, changes) {
    const item = await Item.findById(id);
    if (item.owner !== user) throw { message: 'You can delete only your own listings', status: 403 };

    return await item.delete();
}


module.exports = {
    getListings,
    listItem,
    updateItem,
    deleteItem,
    getItemDetails,
}