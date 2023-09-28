const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const tokenService = require('../services/token-service');
const historyService = require('../services/history');
const UserDto = require('../Dto/user-dto');
const ApiError = require('../exceptions/Auth');

class Auth {
    async registration(name, surename, email, password, accessKey) {
        const condidate = await userModel.findOne({email});
        if (condidate) {
            throw ApiError.BadRequestError(`Пользователь с таким email: ${email} уже существует.`);
        }
        name = name[0].toUpperCase() + name.slice(1);
        const hashPassword = await bcrypt.hash(password, +process.env.hashSalt);
        const userData = {name, surename, password: hashPassword, email};
        if (accessKey === process.env.adminAccessKey) {
            userData['role'] = 'ADMIN';
        } else if (accessKey === process.env.teacherAccessKey) {
            userData['role'] = 'TEACHER';
        }
        const user = await userModel.create(userData);
        const status = {level: user.level};
        const userDto = new UserDto(user);  //id, email
        const tokens = tokenService.generateToken({...userDto});
        return {...tokens, user: userDto, status}

    }

    async login(email, password, refreshToken) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequestError(`Пользователь с email: ${email} не существует.`);
        }
        const isEqualPassword = await bcrypt.compare(password, user.password);
        if (!isEqualPassword) {
            throw ApiError.BadRequestError('Неверный парол');
        }
        const userDto = new UserDto(user);
        const status = {level: user.level};
        const tokens = tokenService.generateToken({...userDto});
        return {...tokens, user: userDto, status};
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const status = {level: user.level, role: user.role};
        const tokens = tokenService.generateToken({...userDto});
        return {...tokens, user: userDto, status};
    }

    async logout() {
    }

    async delete(userID) {
        const currentUser = await userModel.findByIdAndDelete(userID);
        const historyUser = await historyService.clearHistory(userID);
        return currentUser;
    }

    async findUser(userID) {
        const user = await userModel.findById(userID);
        return user;
    }

    async getAllUsers() {
        const users = await userModel.find();
        return users;
    }
}

module.exports = new Auth();