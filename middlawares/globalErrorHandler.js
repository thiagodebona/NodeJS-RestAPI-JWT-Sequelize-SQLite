const resultService = require('../utils/defaultResultService');

const enableGlobalErrorHandler = (expressApp) => {
    expressApp.use('', function (req, res, next) {
        try {
            next();
        } catch (error) {
            resultService.createErrorResult(res, null, null, error, 500);
        }
    });
}

module.exports.enableGlobalErrorHandler = enableGlobalErrorHandler;