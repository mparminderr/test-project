import Joi from 'joi';
export const personSchema = Joi.object()
    .keys({
        first_name: Joi.string()
            .min(3)
            .max(60)
            .required(),
        telephone: Joi
            .string()
            .min(10).required(),
        birthdate:Joi.string().required(),
        last_name:Joi.string(),
        language:Joi.string().required(),
        country:Joi.string().min(1).max(2).required()
    })
