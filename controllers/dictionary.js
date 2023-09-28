const dictionaryService = require('../services/dictionary');
const HistoryModel = require('../models/history');
const tokenService = require('../services/token-service');
const ApiError = require('../exceptions/Auth');

class Dictionary {
    async getQuestions(req, res, next) {
        try {
            const {block, level} = req.headers;
            const data = {block, level};
            const questions = await dictionaryService.getQuestions(data);
            if (!questions?.length > 0) {
                return next(ApiError.BadRequestError('Dictionary question list is empty'));
            }
            res.json(questions)
        } catch (e) {
            next(ApiError.BadRequestError('Can`t get dictionary questions!'));
        }
    }

    async saveDictionary(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const validateToken = tokenService.validateAccessToken(token);
            const {id, name, surename} = validateToken;
            const saveData = await dictionaryService.saveDictionary(req.body, {id, name, surename});
            const history = new HistoryModel(saveData);
            const savedHistory = await history.save();
            res.json(savedHistory);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t save your history!'))
        }
    }
}

module.exports = new Dictionary();