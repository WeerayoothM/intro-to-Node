require('dotenv').config();

const express = require("express");
const db = require("./models");
const app = express();
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running.");
});

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database is running");
});
