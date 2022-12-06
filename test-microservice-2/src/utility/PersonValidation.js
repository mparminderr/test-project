import Joi from "joi";
export const PersonSchema = Joi.object().keys({
  person: Joi.string().min(1).required(),
});
