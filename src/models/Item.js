const { Schema, model } = require("mongoose");
const { CATEGORIES, NO_IMG_URL} = require("../config/constants");

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
                return Object.keys(CATEGORIES).includes(v)
            },
            message: props => `${props.value} is not a valid Category!`
        }
    },
    imageUrl: {
        type: String,
    },
    description: {
        type:String,
        required:[true, 'Please add description']
    },
    location: {
        type:String,
        required:[true, 'Please add location']
    },
    phone: {
        type: Number
    },
    price: {
        type: Number,
        required: [true, 'Price can\'t be empty']
    },
    createdOn: {
        type: Date,
        default: () => Date.now()
    },
    owner: {
        type: String,
        ref: 'User',
    }
})

// Find to return results by date
itemSchema.pre('find', function(next) {
    this.sort({createdOn: -1})
    next()
})

// Pre save hooks
itemSchema.pre('save', function(next) {
    // format price (10.99)
    this.price = this.price.toFixed(2)
    // set default imageUrl if invalid
    if((!this.imageUrl.match(/https?:\/\//i))) this.imageUrl = NO_IMG_URL;
    next();
})


itemSchema.index({title:1}, {
    collation: {
        locale:'en',
        strength: 2
    }
})




const Item = model('Item', itemSchema)

exports.Item = Item;
exports.itemSchema = itemSchema;