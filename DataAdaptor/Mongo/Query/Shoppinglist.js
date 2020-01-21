const listModel = require('../Models/Shoppinglist')

class ShoppingQuery {

    async _GetActivelist (userId) {
        return await listModel.findOne({listCreatedById: userId}).lean()
    };

    async _Createlist (list) {
        return await listModel.create(list);
    };

    async _InsertItem (item, id) {
        return await listModel.updateOne({ _id: id }, { $push: { items: item } });
    };

    async _CheckList (listId) {
        return await listModel.countDocuments({ _id: listId });
    };

    async _DeleteItem (listId, itemId) {
        return await listModel.updateOne({ _id: listId }, { $pull: { 'items._id': itemId } });
    };

    async _GetShoppingListByInvitees (id) {
        return await listModel.find({ 'invitees.userId': id, 'invitees.requestAccepted': true, 'invitees.isRequestcancelled': false });
    };
};

module.exports = new ShoppingQuery();