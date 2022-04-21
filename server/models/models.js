const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Question = sequelize.define('question', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, defaultValue: "Я никогда не" },
    text: { type: DataTypes.STRING, allowNull: false },
    ratingPlus: { type: DataTypes.INTEGER, defaultValue: 0 },
    ratingMinus: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: "Название категории не установлено" },
    description: { type: DataTypes.STRING },
});

const Admin = sequelize.define('admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING },
});

const UserCookie = sequelize.define('usercookie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    info: { type: DataTypes.STRING },
});

const QuestionUsercookie = sequelize.define('question_usercookie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Category.hasMany(Question);
Question.belongsTo(Category);

Question.belongsToMany(UserCookie, { through: QuestionUsercookie });
UserCookie.belongsToMany(Question, { through: QuestionUsercookie });

module.exports = { Question, Category, Admin, UserCookie, QuestionUsercookie };