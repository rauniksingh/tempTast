const __ = require('../../util/response');
const jwt = require('../../middleware/Auth/auth');
const UserQuery = require('../../DataAdaptor/Mongo/Query/User');

class User {
    async _signUp(req, res) {
        try {
             let duplicateEmail = await UserQuery._DuplicateEmailValidation(req.body.email);
             if ( duplicateEmail ) return __.customMsg(req, res, 406, `Email Id: ${req.body.email} already exists`);
             
             let userObj = {
              userName : req.body.userName,
              phoneNumber: req.body.phoneNumber,
              email: req.body.email,
              password: req.body.password
             };

             let createUser = await UserQuery._SignupUser(userObj)
   
             createUser = createUser.toObject();
             let token = await jwt.createToken(createUser._id.toString());
             createUser.token = token;
   
             // Delete unwanted keys from createUser object
             delete createUser['password'];
             delete createUser['updatedAt'];
             delete createUser['createdAt'];
             delete createUser['__v'];
             delete createUser['isDeleted'];
             delete createUser['_id'];
             
             if(createUser) return __.successMsg(req, res, 201, createUser, 'User created successfully');
   
        } catch (error) {
            __.errorMsg(req, res, 500, 'Internal server error', error, '_signUp')
        }
    };

    async _userLogin(req, res) {
        try {
            let userData = await UserQuery._VerifyEmail(req.body.email);
            if (!userData) return __.customMsg(req, res, 404, `${req.body.email} does not exists`);
            
            let verify = await userData.verifyPassword(req.body.password);
            if (!verify)  return __.customMsg(req, res, 401, "Incorrect Password");

            userData = userData.toObject();
            
            let token = await jwt.createToken(userData._id); 
            userData.token = token;    
            
            delete userData['password'];
            delete userData['_id'];
            
            return __.successMsg(req, res, 200, userData, 'User logged successfully');
        } catch (error) {
         __.errorMsg(req, res, 500, 'internal server error', error, '_userLogin');
        };
    };

    async _userProfile(req, res) {
        try {
            let userProfile = await UserQuery._GetProfile(req._id);
            if (!userProfile) return __.customMsg(req, res, 404, 'User not found');

            __.successMsg(req, res, 200, userProfile, 'User profile details' )

        } catch (error) {
            __.errorMsg(req, res, 500, 'internal server error', error, '_userProfile');
        };
    };

    async _updateProfile (req, res) {
        try {
            let userDetail = await UserQuery._GetUserById(req._id);
            if (!userDetail) return __.customMsg(req, res, 404, 'User not found');

            if (req.body.password) {
                req.body.password = await UserQuery._GenPassword(req.body.password);
            };

            let userObject = {
                ... userDetail,
                    ... req.body
            };

            await UserQuery._UpdateProfile(userObject);
            __.successMsg(req, res, 200, undefined, 'User details updated...');
        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_updateProfile');  
        };
    };
};

module.exports = new User();