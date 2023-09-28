const usersService = require('../services/users');

class Users {
    async getUsers(req, res, next) {
        try {
            const userInfo = req.user;
            const usersList = await usersService.getUsersList(userInfo);
            res.json(usersList);
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const body = req.body;
            const updatedUser = await usersService.updateUser(body);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new Users();