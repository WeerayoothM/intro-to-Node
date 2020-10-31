require('dotenv').config();

//* import all package and file
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//* use mongoose to connect database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('DB connected'));

const app = express();

//* for connect with front end
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', productRouter);
app.use('/', userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});