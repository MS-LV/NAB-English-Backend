const ApiError = require('../exceptions/Auth');
function errorMiddlewares(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    console.log('err', err + '+++++++++++++++');
    return res.status(500).json({message: 'Unexpected Server error !'});
}

module.exports = errorMiddlewares