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
            let { page, limit } = req.body;
            page = page || 1;
            limit = limit || process.env.ITEMS_PER_PAGE;
            let offset = page * limit - limit;

            const categories = await Category.findAndCountAll({
                offset, limit,
                order: [['id', 'ASC']],
                include: [{
                    model: Question,
                    attributes: ['id']
                }]
            });
            const count = await Category.count({});
            return res.json({ count, rows: categories.rows });
        } catch (error) {
            res.json({ message: 'Произошла ошибка' });
        }
    }
    async getOne(req, res) {

    }
    async getPair(req, res) {
        try {
            const pairs = await Category.findAll({
                attributes: ['id', 'name'],
            });
            return res.json(pairs);
        } catch (error) {
            res.json({ message: 'Произошла ошибка на сервере' });
        }
    }
}

module.exports = new CategoryController();