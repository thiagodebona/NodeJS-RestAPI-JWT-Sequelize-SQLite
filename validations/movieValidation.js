const Joi = require('@hapi/joi');

const insertValidation = async (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        description: Joi.string().min(5).required(),
        releaseYear: Joi.number().min(1900).max(2200),
        originalTitle: Joi.string()
    });

    return schema.validate(data);
}

const updateValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number().min(1).max(9999999).required(),
        title: Joi.string(),
        description: Joi.string(),
        releaseYear: Joi.number(),
        originalTitle: Joi.string()
    });
    return schema.validate(data);
}

module.exports.insertValidation = insertValidation;
module.exports.updateValidation = updateValidation;