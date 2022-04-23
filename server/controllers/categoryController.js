const { Category, Question } = require('../models/models');
const { Sequelize } = require('sequelize');

class CategoryController {
    async create(req, res) {
        let { name, description } = req.body;
        if (!name) {
            return res.json({ message: 'Введите название' });
        }
        let categories;
        categories = await Category.create({ name, description });
        return res.json(categories);
    }
    async getAll(req, res) {
        let { page, limit } = req.query;
        page = page || 1;
        limit = limit || 30;
        let offset = page * limit - limit;

        let categories = await Category.findAndCountAll({
            limit, page,
            include: [{
                model: Question,
                attributes: ['id']
            }]
        });
        return res.json(categories)
    }
    async getOne(req, res) {

    }
}

module.exports = new CategoryController();