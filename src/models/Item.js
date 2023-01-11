const { Schema, model } = require("mongoose");
const { CATEGORIES } = require("../config/constants");

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
        minLength: [3, 'Title should be at least 3 characters long']
    },
    category: {
        type: String,
        required: [true, 'Category can\'t be empty'],
        validate: {
            validator: function (v) {
                return CATEGORIES.includes(v)
            },
            message: props => `${props.value} is not a valid Category!`
        }
    },
    imageUrl: {
        type: String,
        match: [/^http/, 'Please enter valid URL']
    },
    price: {
        type: Number,
        required: [true, 'Price can\'t be empty']
    },
    createdOn: {
        type: Date,
        default: () => new Date().now()
    },
    phone: {
        type: Number
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Item = model('Item', itemSchema)

module.exports = Item;