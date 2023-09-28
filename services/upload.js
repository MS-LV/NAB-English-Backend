const dictionaryModel = require('../models/dictionary');
const listeningModel = require('../models/listening');
const writingModel = require('../models/writing');
const grammarModel = require('../models/grammar');
const readingModel = require('../models/reading');

class Upload {
    async uploadAndSave(questionsList) {
        const savedFiles = [];
        for (const question of questionsList) {
            let currentQuestion = 0;
            savedFiles.push(question.type);
            if (question.type === 'dictionary') {
                await dictionaryModel.deleteMany({});
                currentQuestion = await dictionaryModel.insertMany(question.list);
            } else if (question.type === 'listening') {
                await listeningModel.deleteMany({});
                currentQuestion = await listeningModel.insertMany(question.list);
            } else if (question.type === 'reading') {
                await readingModel.deleteMany({});
                currentQuestion = await readingModel.insertMany(question.list);
            } else if (question.type === 'grammar') {
                await grammarModel.deleteMany({});
                currentQuestion = await grammarModel.insertMany(question.list);
            } else if (question.type === 'writing') {
                await writingModel.deleteMany({});
                currentQuestion = await writingModel.insertMany(question.list);
            }
        }
        return savedFiles;

    }
}

module.exports = new Upload();