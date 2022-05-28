const { newChangeValidation } = require('../validations/auditValidation');
const Audit = require("../models").Audits;

const pushNewAuditChange = async (tableName, action, pkValue, updatedBy, callback) => {
    try {
        const { error } = await newChangeValidation(tableName, action, pkValue, updatedBy);
        if (error) throw error.details[0].message;

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
    } catch (error) {
        throw error;
    }
};

module.exports = {
    pushNewAuditChange: pushNewAuditChange
};