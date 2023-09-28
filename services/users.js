const UsersModels = require("../models/users");

class Users {
    async getUsersList(userInfo) {
        let usersList = null;
        const projection = {name: 1, surename: 1, email: 1, role: 1, level: 1}
        if (userInfo.role === 'TEACHER') {
            usersList = await UsersModels.find({role: {$ne: 'ADMIN'}}, projection);
            return usersList;
        }
        usersList = await UsersModels.find({}, projection).sort({name: 1});
        return usersList;
    }

    async updateUser(userInfo) {
        const updateUser = await UsersModels.findByIdAndUpdate(userInfo._id, userInfo, {new: true});
        return updateUser;
    }
}

module.exports = new Users();