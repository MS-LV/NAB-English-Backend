const dictionaryQuestion = require('../models/dictionary');
const {Schema} = require("mongoose");

class DictionaryService {
    async getQuestions(data = {}) {
        const questions = await dictionaryQuestion.find(data);
        return questions;
    }

    async saveDictionary(body, user) {
        const {data, group, block, isExpired} = body;
        const saveData = {
            data,
            group,
            block,
            user,
            isExpired
        }
        return saveData;
    }
}

module.exports = new DictionaryService();