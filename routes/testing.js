const {Router} = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const testingController = require('../controllers/testing');
const route = new Router();

route.get('/grammar', authMiddleware(), testingController.grammar);

route.get('/reading', authMiddleware(), testingController.reading);

route.get('/listening', authMiddleware(), testingController.listening);

route.get('/dictionary', authMiddleware(), testingController.dictionary);

route.get('/writing', authMiddleware(), testingController.writing);

module.exports = route;