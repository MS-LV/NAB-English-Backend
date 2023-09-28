const {Router} = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const historyController = require('../controllers/history');
const route = new Router();

route.get('/', authMiddleware(), historyController.getHistory);
route.post('/', authMiddleware(), historyController.saveHistory);
route.get('/:id', authMiddleware(), historyController.unitHistory)

module.exports = route