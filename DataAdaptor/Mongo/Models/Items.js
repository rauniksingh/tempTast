const mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    itemName: {
        type: String
    },
    category: {
        type: String
    }
},{
    timestamps: true
});

let itemModel = mongoose.model('items', itemSchema, 'items');
module.exports = itemModel;