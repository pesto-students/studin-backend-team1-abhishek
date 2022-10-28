import Joi from "joi";

function getDataSchema() {
  return Joi.object({
    brideName: Joi.string(),
    brideFatherName: Joi.string(),
    brideMotherName: Joi.string(),
    brideState: Joi.string(),
    brideCity: Joi.string(),
    groomName: Joi.string(),
    groomFatherName: Joi.string(),
    groomMotherName: Joi.string(),
    groomState: Joi.string(),
    groomCity: Joi.string(),
  });
}

export async function weddingDetailsValidation(req, res, next) {
  const validationSchema = await getDataSchema(req, res);
  const userInput = req.body;
  const { error } = validationSchema.validate(userInput);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}