const express = require('express');
const app = express();
const studentRoute = require('./routers/students')
const todoRoute = require('./routers/todos')
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/students', studentRoute)
app.use('/todos', todoRoute)

app.listen(5555, () => {
    console.log("Server is running at PORT 5555")
})