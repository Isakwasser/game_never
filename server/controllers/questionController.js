const ApiError = require("../error/ApiError");
const { Question, Category } = require("../models/models");
const { Sequelize } = require('sequelize');

class QuestionController {
    async create(req, res, next) {
        try {
            let { title, text, categoryId } = req.body;
            if (!text) {
                return res.json({ message: 'Введите текст' });
            }
            const checkQuestion = await Question.findOne({ where: { text } });
            if (checkQuestion) {
                return res.json({ message: 'Вопрос уже существует' });
            }
            let question;
            categoryId = categoryId || 1;
            question = await Question.create({ title, text, categoryId });
            return res.json(question);
        } catch (error) {
            return res.json({ message: 'Произошла ошибка' });
        }
    }
    async getAll(req, res) {
        let { page, limit, categoryId } = req.body;
        page = page || 1;
        limit = limit || process.env.ITEMS_PER_PAGE;
        let offset = page * limit - limit;

        let questions;
        if (categoryId) {
            questions = await Question.findAndCountAll({ where: { categoryId }, order: [['id', 'ASC']], limit, offset });
        }
        if (!categoryId) {
            questions = await Question.findAndCountAll({
                limit, offset,
                order: [['id', 'ASC']],
                include: [{ model: Category }],
            });
        }
        return res.json(questions)
    }
    async delete(req, res) {
        const { id } = req.body;
        if (!id) {
            return res.json({ message: 'Не указан ID' });
        }
        const question = await Question.destroy({ where: { id } });
        res.json({ question, success: true });
    }
    async edit(req, res) {
        const { id, title, text, categoryId } = req.body;
        if (!id) {
            return res.json({ message: 'Не указан ID' });
        }
        let question;
        if (title && text && categoryId) {
            question = await Question.update({ title, text, categoryId }, {
                where: { id }
            })
        }
        if (title && text && !categoryId) {
            question = await Question.update({ title, text }, {
                where: { id }
            })
        }
        if (title && !text && categoryId) {
            question = await Question.update({ title, categoryId }, {
                where: { id }
            })
        }
        if (title && !text && !categoryId) {
            question = await Question.update({ title }, {
                where: { id }
            })
        }
        if (!title && text && categoryId) {
            question = await Question.update({ text, categoryId }, {
                where: { id }
            })
        }
        if (!title && text && !categoryId) {
            question = await Question.update({ text }, {
                where: { id }
            })
        }
        if (!title && !text && categoryId) {
            question = await Question.update({ categoryId }, {
                where: { id }
            })
        }
        if (!title && !text && !categoryId) {
            return res.json({ message: 'Данные для редактирования не заданы' });
        }

        res.json({ question, success: true });
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