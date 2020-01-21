const mongoose = require('mongoose')
let listSchema = mongoose.Schema({
    items: [{
        itemName: {
            type: String
        },
        quantity: {
            type: Number
        },
        note: {
            type: String
        },
        category: {
            type: String
        },
        itemHistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'itemHistory'
        },
        addedBy: {
            type: String
        }        
    }],
    invitees: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        requestAccepted: {
            type: Boolean,
            default: false
        },
        isRequestcancelled: {
            type: Boolean,
            default: false
        }
    }],
    listCreatedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    listCreatedByName: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

let listModel = mongoose.model('shoppinglists', listSchema, 'shoppinglists');
module.exports = listModel;
