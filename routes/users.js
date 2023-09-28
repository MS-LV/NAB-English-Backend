const {Router} = require('express');
const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth-middleware');
const route = new Router();
route.get('/', authMiddleware(['ADMIN', 'TEACHER']), usersController.getUsers);
route.post('/update', authMiddleware(['ADMIN']), usersController.updateUser);
module.exports = route;