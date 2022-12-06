import Joi from "joi";
export const documentSchema = Joi.object().keys({
  document_name: Joi.string().min(3).max(60).required(),
  language: Joi.string().min(1).max(2).required(),
  person: Joi.string().min(1).max(2).required(),
});
