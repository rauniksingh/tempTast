const express = require('express')
const app = express.Router()
const auth = require('../../middleware/Auth/auth')
const Validator = require('../../middleware/Validations/UserValidator')
const UserCtrl = require('../../services/User/user')

app.post('/signup', Validator.signup, UserCtrl._signUp);

app.post('/login', Validator.login, UserCtrl._userLogin);

app.get('/profile', auth.authentication, UserCtrl._userProfile);

app.put('/profile/update', auth.authentication, UserCtrl._updateProfile);

// app.get('/profile/:id', auth.authentication, UserCtrl._userProfile); // User Id can be passed as params but already encrypting in token


module.exports = app