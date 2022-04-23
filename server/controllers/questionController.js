const ApiError = require("../error/ApiError");
const { Question, Category } = require("../models/models");
const { Sequelize } = require('sequelize');

class QuestionController {
    async create(req, res, next) {
        let { title, text, categoryId } = req.body;
        if (!text) {
            return res.json({ message: 'Введите текст' });
        }
        let question;
        categoryId = categoryId || 1;
        question = await Question.create({ title, text, categoryId });
        return res.json(question);
    }
    async getAll(req, res) {
        let { page, limit, categoryId } = req.query;
        page = page || 1;
        limit = limit || 30;
        let offset = page * limit - limit;

        let questions;
        if (categoryId) {
            questions = await Question.findAndCountAll({ where: { categoryId }, limit, offset });
        }
        if (!categoryId) {
            questions = await Question.findAndCountAll({
                limit, offset,
                include: [{ model: Category }],
            });
        }
        return res.json(questions)
    }
    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'));
        }
        res.json(id)
    }
    async getToPlay(req, res, next) {
        const { categoryId } = req.query;
        try {
            let question;
            if (categoryId) {
                question = await Question.findAll({
                    where: { categoryId },
                    order: [
                        [Sequelize.literal('RANDOM()')]
                    ],
                    limit: 1,
                });
            }
            if (!categoryId) {
                question = await Question.findAll({
                    order: [
                        [Sequelize.literal('RANDOM()')]
                    ],
                    limit: 1,
                });
            }
            return res.json(question);
        } catch (err) {
            return next(ApiError.badRequest('Произошла ошибка логики на сервере =('));
        }
    }
}

module.exports = new QuestionController();