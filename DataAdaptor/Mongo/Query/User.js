const UserModel = require('../Models/User')

class User {

  async _GetUserById (id) {
    return await UserModel.findOne({ _id: id }).lean();
  };

  async _SignupUser (userObj) {
    let newUser = new UserModel(userObj);
    newUser.password = newUser.generateHash(userObj.password);
    return await newUser.save();
  };

  async _DuplicateEmailValidation (email) {
    return await UserModel.find({ email: email }).countDocuments();
  };

  async _VerifyEmail (email) {
    return await UserModel.findOne({ email: email.toLowerCase() }).select('-isDeleted -__v -updatedAt -createdAt');
  };

  async _GetProfile (id) {
    return await UserModel.findOne({ _id: id }).select('userName email phoneNumber -_id').lean();
  };

  async _GenPassword (password) {
    let user = new UserModel();
    password = user.generateHash(password);
    return password;
  };
  
  async _UpdateProfile(data) {
    return await UserModel.updateOne({ _id: data._id }, { $set: data });
  };

};

module.exports = new User()