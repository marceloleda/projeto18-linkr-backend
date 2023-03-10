import Joi from "@hapi/joi"

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().invalid('').required(),
  username: Joi.string().invalid('').required(),
  picture_url: Joi.string().uri().required()
}) 