const historyModel = require('../models/history');

class History {
    async formatSavingData(body, user) {
        const {correct, incorrect, group, block, data, type, isExpired} = body;
        const saveData = {
            correct,
            incorrect,
            group,
            block,
            data,
            type: type ? type : 'everyday',
            user,
            isExpired
        }
        return saveData;
    }

    async unitHistory(historyID) {
        const history = await historyModel.findById(historyID);
        return history
    }

    async clearHistory(userID) {
        const history = await historyModel.deleteMany({'user.id': userID});
    }
}

module.exports = new History();