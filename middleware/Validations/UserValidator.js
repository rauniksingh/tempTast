const __ = require('../../util/response')
const Joi = require('joi')

class EmpValidator {
  async signup (req, res, next) {
    const phoneNumberRegEx = /^[0-9]{10}$/
    const schema = Joi.object().keys({
      userName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().required().regex(phoneNumberRegEx)
    })

    try {
      const result = await Joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    };
  };

  async login (req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    })

    try {
      const result = await Joi.validate(req.body, schema)
      if (result) return next()
    } catch (error) {
      __.errorMsg(req, res, 400, error.details[0].message, error)
    };
  };
};

module.exports = new EmpValidator()
