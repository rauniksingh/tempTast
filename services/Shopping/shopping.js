const __ = require('../../util/response');
const listQuery = require('../../DataAdaptor/Mongo/Query/User');
const userQuery = require('../../DataAdaptor/Mongo/Query/User');
class ShoppingList {

    async _addItems (req, res) {
        try {
            
            let getUser = await userQuery._GetUserById(req._id); 
            if (!getUser) return __.customMsg(req, res, 404, 'Incorrect user id');

            let getCurrentList = await listQuery._GetActivelist(req._id);
            if (!getCurrentList) {
                let listObj = {
                    items: [{
                        itemName: req.body.itemName,
                        quantity: req.body.quantity,
                        note: req.body.note,
                        category: req.body.category,
                        addedBy: getUser.userName
                    }],
                    listCreatedById: getUser._id,
                    listCreatedByName: getUser.userName,
                    isActive: true
                };
                
                await listQuery._Createlist(listObj);
            };

            if (getCurrentList) {
                let item = {
                    itemName: req.body.itemName,
                    quantity: req.body.quantity,
                    note: req.body.note,
                    category: req.body.category,
                    addedBy: getUser.userName
                };
                await listQuery._InsertItem(item, getCurrentList._id);
            };

            __.successMsg(req, res, 200, undefined, 'item added successfully');

        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_addItems');  
        };
    };

    async _deleteItems (req, res) {
        try {
            
            let checkList = await listQuery._CheckList(req,params.listId);
            if (!checkList) return __.customMsg(req, res, 404, 'List not found');

            await listQuery._DeleteItem(req,params.listId, req.params.itemId);

        } catch (error) {
            __.errorMsg(req, res, 500, 'Internal server error', error, '_deleteItems');  
        };
    };

    async _getShoppingList (req, res) {
        let shoppinglist = await listQuery._GetShoppingListByInvitees(req._id);

        __.successMsg(req, res, 200, shoppinglist, 'Shopping list');
    };

};

module.exports = new ShoppingList();


