const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy", "sour", "neutraltaste"],
        required: true
    },
    isDrink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: [],
    },
    sales: {
        type: Number,
        default: 0,
    }
});

const menuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = menuItem;