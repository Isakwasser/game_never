const ApiError = require("../error/ApiError");

class QuestionController {
    async getAll(req, res) {

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