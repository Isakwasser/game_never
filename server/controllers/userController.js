const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/models');

const generateJwt = (id, login) => {
    return jwt.sign({ id, login },
        process.env.SECRET_KEY,
        { expiresIn: '24h' });
}

class UserController {
    async registration(req, res, next) {
        const { login, password } = req.body;
        if (!login) {
            return next(ApiError.badRequest('Укажите логин'));
        }
        if (!password) {
            return next(ApiError.badRequest('Укажите пароль'));
        }
        const candidate = await Admin.findOne({
            where: { login },
        });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await Admin.create({
            login,
            password: hashPassword,
        });
        const token = generateJwt(user.id, login);
        res.json({ token });

    }
    async login(req, res, next) {
        const { login, password } = req.body;
        if (!login) {
            return next(ApiError.badRequest('Введите логин'));
        }
        const user = await Admin.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.badRequest('Пользователя с таким логином не существует'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.login);
        return res.json({ token });
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login);
        return res.json({ token });
    }
}

module.exports = new UserController();