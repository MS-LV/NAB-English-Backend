const {Router} = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const configController = require('../controllers/configs');
const route = new Router();

route.get('/', authMiddleware(), configController.getConfigs);
route.put('/', authMiddleware(['ADMIN']), configController.updateConfig);

module.exports = route;