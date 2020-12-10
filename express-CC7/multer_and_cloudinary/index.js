require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
});

mongoose
    .connect(process.env.DB_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'));

app.listen(process.env.PORT, () => {
    console.log('Server is running');
});