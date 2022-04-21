const { Category } = require('../models/models');

class CategoryController {
    async create(req, res) {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        return res.json(category);
    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
}

module.exports = new CategoryController();