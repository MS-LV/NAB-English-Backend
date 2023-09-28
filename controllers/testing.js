const grammarModel = require('../models/grammar');
const listeningModel = require('../models/listening');
const readingModel = require('../models/reading');
const writingModel = require('../models/writing');
const dictionaryModel = require('../models/dictionary');
const ApiError = require("../exceptions/Auth");

class Testing {
    async grammar(req, res, next) {
        try {
            const {block, level} = req.headers;
            const grammarQuestions = await grammarModel.find({block, level});
            if (!grammarQuestions?.length > 0) {
                return next(ApiError.BadRequestError('Grammar question list is empty'));
            }
            res.json(grammarQuestions);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t get grammar questions!'));
        }
    }

    async reading(req, res, next) {
        try {
            const {block, level} = req.headers;
            const readingQuestions = await readingModel.find({block, level});
            if (!readingQuestions?.length > 0) {
                return next(ApiError.BadRequestError('Reading question list is empty'));
            }
            res.json(readingQuestions);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t get reading questions!'));
        }
    }

    async listening(req, res, next) {
        try {
            const {block, level} = req.headers;
            const listeningQuestions = await listeningModel.find({block, level});
            if (!listeningQuestions?.length > 0) {
                return next(ApiError.BadRequestError('Listening question list is empty'));
            }
            res.json(listeningQuestions);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t get listening questions!'));
        }
    }

    async dictionary(req, res, next) {
        try {
            const {block, level} = req.headers;
            const dictionaryQuestions = await dictionaryModel.find({block, level});
            if (!dictionaryQuestions?.length > 0) {
                return next(ApiError.BadRequestError('Dictionary question list is empty'));
            }
            res.json(dictionaryQuestions);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t get dictionary questions!'));
        }
    }

    async writing(req, res, next) {
        try {
            const {block, level} = req.headers;
            const writingQuestions = await writingModel.find({block, level});
            if (!writingQuestions?.length > 0) {
                return next(ApiError.BadRequestError('Writing topics list are empty!'));
            }
            res.json(writingQuestions);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t get writing topics!'));
        }
    }
}

module.exports = new Testing();
