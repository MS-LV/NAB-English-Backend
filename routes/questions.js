const dictionaryController = require('../controllers/dictionary');
const authMiddleware = require('../middlewares/auth-middleware');
const {Router} = require('express');
const route = new Router();

route.get('/dictionary', authMiddleware(), dictionaryController.getQuestions)
route.post('/dictionary', authMiddleware(), dictionaryController.saveDictionary);


module.exports = route