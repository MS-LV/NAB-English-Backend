const ApiError = require('../exceptions/Auth');
const tokenService = require('../services/token-service');

function AuthMiddleware(access = []) {
    return (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.UnauthorizedError());
            }
            const accessTokenVerify = tokenService.validateAccessToken(accessToken);
            if (!accessTokenVerify) {
                return next(ApiError.UnauthorizedError())
            }
            req.user = accessTokenVerify;
            if (!access.length) {
                return next();
            }
            const canActivate = access.includes(accessTokenVerify.role);
            if (!canActivate) {
                return next(ApiError.BadRequestError(`${accessTokenVerify.role} doesn\`t have access !`));
            }
            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    }
}

module.exports = AuthMiddleware;