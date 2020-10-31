require('dotenv').config();
require('./config/passport');

// USE ORM liblary of MySQL ทำให้ไม่ต้องเขียน MySQL

const express = require('express');
const db = require('./models/index');
const app = express();
const todoRouter = require('./routes/todo');
const personRouter = require('./routes/person');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter);
app.use('/persons', personRouter);
app.use('/auth', userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database connected.");
}).catch(err => {
    console.log(err);
});