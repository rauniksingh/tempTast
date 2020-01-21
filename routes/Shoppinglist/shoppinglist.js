const express = require('express')
const app = express.Router()
const auth = require('../../middleware/Auth/auth')
const Validator = require('../../middleware/Validations/UserValidator')
const listCtrl = require('../../services/Shopping/shopping')

app.post('/addItems', Validator.signup, listCtrl._addItems);


module.exports = app;