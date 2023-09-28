const userService = require('../services/auth');
const cleanStorage = require('../helper/cleanDB')
const ApiError = require("../exceptions/Auth");
const tokenService = require("../services/token-service");

class Auth {
    async registration(req, res, next) {
        try {
            const {name, surename, email, password, accessKey} = req.body;
            const userData = await userService.registration(name, surename, email, password, accessKey);
            const maxAge = 31556952000; // one year in milliseconds
            res.cookie('refreshToken', userData.refreshToken, {maxAge, httpOnly: true});
            res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const {refreshToken} = req.cookies;
            const userData = await userService.login(email, password, refreshToken);
            const maxAge = 31556952000; // one year in milliseconds
            res.cookie('refreshToken', userData.refreshToken, {maxAge});
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const userData = req.body;
            const {refreshToken} = req.cookies;
            const removeToken = userService.logout();
            cleanStorage(req, res);
            res.json(removeToken);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            const maxAge = 31556952000;
            res.cookie('refreshToken', userData.refreshToken, {maxAge, httpOnly: true});
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async authorized(req, res, next) {
        try {
            const {accessToken} = req.body;
            if (!accessToken) {
                return res.status(400).json({error: [], message: 'Unauthorized user!'});
            }
            const accessTokenVerify = tokenService.validateAccessToken(accessToken);
            if (!accessTokenVerify) {
                return res.status(400).json({error: [], message: 'Unauthorized user!'});
            }
            const user = await userService.findUser(accessTokenVerify.id);
            if (!user) {
                return res.status(400).json({error: [], message: 'Unauthorized user!'});
            }
            return res.json({message: 'authorized user!'});
        } catch (e) {
            next(e);
        }

    }

    async delete(req, res, next) {
        try {
            const userID = req.params.id;
            const deletedUser = await userService.delete(userID);
            res.json(deletedUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new Auth();