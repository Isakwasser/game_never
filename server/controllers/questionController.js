const ApiError = require("../error/ApiError");
const { Question } = require("../models/models");

class QuestionController {
    async getAll(req, res) {
        let { page, limit, categoryId } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;

        let questions;
        if (categoryId) {
            questions = await Question.findAndCountAll({ where: { categoryId }, limit, offset });
        }
        questions = await Question.findAndCountAll({ limit, offset });
        return res.json(questions)
    }
    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'));
        }
        res.json(id)
    }
}

module.exports = new QuestionController();