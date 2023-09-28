const {Router} = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const uploadControls = require('../controllers/upload');
const route = new Router();


route.post('/', authMiddleware(['ADMIN']), uploadControls.uploadAndSave);

// route.get('/', uploadControls.getDictionary);

module.exports = route;