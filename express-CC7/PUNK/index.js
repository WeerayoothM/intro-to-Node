const express = require('express');
const app = express();
const studentsRoute = require('./routers/students')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/students', studentsRoute)

app.listen(5555, () => {
    console.log("Server is running at PORT 5555")
})