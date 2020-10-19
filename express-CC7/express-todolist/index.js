const express = require('express');

const todoRouter = require('./routes/todos')

const app = express();

app.use(express.static('./public/'))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());                      //! แปลง req body ที่ใส่เข้ามา ให้เป็น json ให้ js อ่านรู้เรื่อง เป็น middleware ตัวนึง

app.use((req, res, next) => {
    req.test = 'test message'                        //! สามารถ ปรับแต่ง req ที่ใส่เข้ามาได้ และใช้ใน middleware ข้างล่างได้
    next();
})

// app.get('/todos', getTodos);
// app.get('/todos/:id', validateId, getTodo);
// app.post('/todos', createTodo)
// app.patch('/todos/:id', validateId, updateTodo)
// app.delete('/todos/:id', validateId, deleteTodo)   //! delete ต้องใช้ id เพื่อให้รู้ว่าจะลบตัวไหน

//! group รวม method ต่างๆ เข้าด้วยกัน ทุก method ที่เป็น path todos ให้เข้าไปทำ todoRouter
app.use('/todos', todoRouter)

app.use((req, res, next) => {
    next(new Error("error"))                    //* ถ้ามี  new Error ใน next จะข้ามไปที่ error middleware ทันที
})

app.use((err, req, res, next) => {              //* error middle ware
    res.status(404).send({ message: "path not found" })
})

const port = 9999;
app.listen(port, () => {
    console.log(`server starting on port ${port}`);
})