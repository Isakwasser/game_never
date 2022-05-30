require('dotenv').config();
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api', router)

/* Регистрация errorHandler в конце файла. Последний Middleware */
app.use(errorHandler);

const start = async() => {
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