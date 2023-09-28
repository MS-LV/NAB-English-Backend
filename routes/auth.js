const {Router} = require('express');
const userController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth-middleware');
const route = Router();
route.post('/login', userController.login);
route.post('/logout', userController.logout);
route.post('/registration', userController.registration);
route.post('/refresh', userController.refresh);
route.post('/authorized', userController.authorized);
route.delete('/delete/:id', authMiddleware(), userController.delete);


module.exports = route;