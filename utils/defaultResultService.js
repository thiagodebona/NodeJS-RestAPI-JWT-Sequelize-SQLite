const createSuccessResult = async (res, data, message = null, status = 200) => {
    res.status(status).send({
        requestStatus: status,
        data: data,
        message: message,
        success: true,
        error: null
    });
}

const createErrorResult = async (res, data, message, error, status = 400) => {
    res.status(status).send({
        requestStatus: status,
        data: data,
        message: message,
        success: false,
        error: error
    });
}

const createNotFoundResult = async (res, data = null, message = null, error = null) => {
    res.status(404).send({
        requestStatus: 404,
        data: data,
        message: message,
        success: false,
        error: error
    });
}

module.exports.createSuccessResult = createSuccessResult;
module.exports.createErrorResult = createErrorResult;
module.exports.createNotFoundResult = createNotFoundResult;