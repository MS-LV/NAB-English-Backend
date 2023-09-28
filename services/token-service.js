const jwt = require('jsonwebtoken');

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '24h'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: 31556952000}); // one year in milliseconds
        return {accessToken, refreshToken};
    }

    validateAccessToken(token) {
        try {
            if (!token) {
                return null;
            }
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
            return userData;
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService();