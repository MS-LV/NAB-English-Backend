const historyModel = require('../models/history');
const moment = require('moment'); // Для работы с датами

class CleanDB {
    async history() {
        try {
            const expiredDate = process.env.historyExpiredDate;
            // Определяем дату, которая была 6 месяцев назад от текущей даты
            const expiredHistoriesDate = moment().subtract(expiredDate, 'month').toDate();
            // Удаляем записи, созданные более шести месяцев назад
            const result = await historyModel.deleteMany({ createdAt: { $lt: expiredHistoriesDate } });
            console.log(`Удалено ${result.deletedCount} записей истории, созданных более ${expiredDate} месяцев назад.`);
        } catch (error) {
            console.error('Произошла ошибка при очистке истории:', error);
        }
    }
}

module.exports = new CleanDB();