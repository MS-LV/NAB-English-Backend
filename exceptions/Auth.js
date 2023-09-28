class AuthError extends Error{
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new AuthError(401, 'Ползователь не авторизован !', ['unauthorized']);
    }
    static BadRequestError(message, errors = []) {
        return new AuthError(400, message, errors);
    }

}

module.exports = AuthError;