const HistoryModel = require('../models/history');
const tokenService = require("../services/token-service");
const ApiError = require("../exceptions/Auth");
const historyService = require('../services/history')
const {validationResult} = require("express-validator");

class History {
    async getHistory(req, res, next) {
        try {
            const usersInfo = req.headers.user;
            const token = req.headers.authorization.split(' ')[1];
            const validateToken = tokenService.validateAccessToken(token);
            if (!validateToken) {
                return next(ApiError.UnauthorizedError());
            }
            if (['ADMIN', 'TEACHER'].includes(validateToken.role)) {
                const findOptions = usersInfo ? {'user.id': usersInfo} : {};
                const history = await HistoryModel.find(findOptions).sort({createdAt: -1});
                return res.json(history);
            }
            const history = await HistoryModel.find({'user.id': req.user.id}).sort({createdAt: -1});
            res.json(history);
        } catch (e) {
            next(ApiError.BadRequestError('Can not get history!'));
        }
    }

    async saveHistory(req, res, next) {
        console.log('saving');
        try {
            const token = req.headers.authorization.split(' ')[1];
            const validateToken = tokenService.validateAccessToken(token);
            const {id, name, surename} = validateToken;
            const saveData = await historyService.formatSavingData(req.body, {id, name, surename});
            const history = new HistoryModel(saveData);
            const savedHistory = await history.save();
            res.json(savedHistory);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t save you history!'));
        }
    }

    async unitHistory(req, res, next) {
        try {
            const historyID = req.params.id;
            const unitHistory = await historyService.unitHistory(historyID);
            if (unitHistory?.user?.id !== req.user.id &&
                !['TEACHER', 'ADMIN'].includes(req.user.role)) {
                return next(ApiError.BadRequestError('It isn`t your history!'));
            }
            res.json(unitHistory);
        } catch (e) {
            next(ApiError.BadRequestError('History does not exist!'));
        }
    }
}

module.exports = new History();