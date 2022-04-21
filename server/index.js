require('dotenv').config();
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const models = require('./models/models');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
