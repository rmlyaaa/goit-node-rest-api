import Joi from "joi";

export const addSchema = Joi.object({
  name: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .min(6)
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
