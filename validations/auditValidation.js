const Joi = require('@hapi/joi');

const newChangeValidation = (tableName, action, pkValue, updatedBy) => {
    const schema = Joi.object({
        updatedTable: Joi.string().min(2).required(),
        action: Joi.string().min(2).required(),
        pkValue: Joi.any(),
        updatedBy: Joi.number(),
    });

    return schema.validate({
        updatedTable: tableName,
        action: action,
        pkValue: pkValue,
        updatedBy: updatedBy
    });
}

module.exports.newChangeValidation = newChangeValidation;