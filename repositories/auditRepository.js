const { newChangeValidation } = require('../validations/auditValidation');
const resultService = require('../utils/defaultResultService');
const Audit = require("../models").Audits;

const pushNewAuditChange = async (tableName, action, pkValue, updatedBy, callback) => {
    const { error } = await newChangeValidation(tableName, action, pkValue, updatedBy);
    if (error)
        resultService.createErrorResult(res, null, error.details[0].message, error);

    const auditChange = {
        updatedTable: tableName,
        action: action,
        pkValue: pkValue,
        updatedBy: updatedBy,
        updatedAt: new Date(),
    };

    await Audit.create(auditChange).then((item) => {
        if (typeof callback === 'function') {
            callback(item);
        }
    });
};

module.exports = {
    pushNewAuditChange: pushNewAuditChange
};