const { Category, Question } = require('../models/models');
const { Sequelize } = require('sequelize');

class CategoryController {
    async create(req, res) {
        let { name, description } = req.body;
        if (!name) {
            return res.json({ message: 'Введите название' });
        }
        const candidate = await Category.findOne({ where: { name } });
        if (candidate) {
            return res.json({ message: 'Категория с таким названием уже существует' });
        }
        let categories;
        categories = await Category.create({ name, description });
        return res.json(categories);
    }
    async getAll(req, res) {
        try {
            let { page, limit } = req.query;
            page = page || 1;
            limit = limit || process.env.ITEMS_PER_PAGE;
            let offset = page * limit - limit;

            let categories = await Category.findAndCountAll({
                limit, page,
                order: [['id', 'ASC']],
                include: [{
                    model: Question,
                    attributes: ['id']
                }]
            });
            return res.json(categories)
        } catch (error) {
            res.json({ message: 'Произошла ошибка' });
        }
    }
    async getOne(req, res) {

    }
}

module.exports = new CategoryController();