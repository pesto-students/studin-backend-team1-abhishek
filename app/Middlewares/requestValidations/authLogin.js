const Joi = require("joi");

function getLoginSchema() {
  return Joi.object({
    email: Joi.string(),
    otp: Joi.string(),
  });
}

async function authLoginValidation(req, res, next) {
  const validationSchema = await getLoginSchema(req, res);
  const userInput = req.body;
  const { error } = validationSchema.validate(userInput);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

module.exports = authLoginValidation;