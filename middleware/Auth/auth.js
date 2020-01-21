const jwt = require('jsonwebtoken')
const __ = require('../../util/response')
const UserModel = require('../../DataAdaptor/Mongo/Query/User')
const { encryptorToken } = require('./encryptor')
const { decryptorToken } = require('./decryptor')

class Jwt {
  async createToken (_id) {
    return jwt.sign({ _id: encryptorToken(_id) }, process.env.SECRET_KEY, { expiresIn: '7d' })
  };

  async authentication (req, res, next) {
    try {
      const decoded = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
      
      if (decoded) {
        const verifyUser = await UserModel._GetUserById(decryptorToken(decoded._id))
        if (!verifyUser) return res.status(401).json({ message: 'Illegal access' })
        req._id = verifyUser._id;
        next()
      };
    } catch (error) {
      return __.errorMsg(req, res, 401, error.message, error, 'authentication')
    };
  };
};

module.exports = new Jwt()
