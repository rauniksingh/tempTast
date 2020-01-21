const mongoose = require('mongoose');
let historySchema = mongoose.Schema({
    shoppinglistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shoppinglists'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId
    },
    history: [{
        from: {},
        to: {},
        by: String,
        timestamp: Date
    }]
},{
    timestamps: true
});

let historyModel = mongoose.model('itemHistory', historySchema, 'itemHistory');
module.exports = historyModel;