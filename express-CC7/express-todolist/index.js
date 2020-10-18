const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.json()); //! แปลง req body ที่ใส่เข้ามา ให้ js อ่านรู้เรื่อง

const todoList = JSON.parse(fs.readFileSync("./mocks/todo.json"));

app.get('/todos', (req, res, next) => {
    res.status(200).send(todoList);
});

app.post('/todos', (req, res, next) => {
    const newId = todoList[todoList.length - 1].id + 1;
    const newTodoList = { id: newId, task: req.body.task }
    todoList.push(newTodoList)
    // console.log(req.body)
    // console.log(todoList)
    fs.writeFileSync('./mocks/todo.json', JSON.stringify(todoList))
    res.status(201).send({ todo: newTodoList })
})
app.patch('/todos', (req, res, next) => {
    res.send({ message: 'this is in patch method' })
})
app.delete('/todos/:id', (req, res, next) => {    // delete ต้องใช้ id เพื่อให้รู้ว่าจะลบตัวไหน
    const index = todoList.findIndex(ele => ele.id === req.params.id * 1)
    const newTodoList = todoList.filter(elem => elem.id !== req.params.id * 1)
    if (index === -1) {
        res.status(404).send({ message: 'Invalid Id' })
        return
    }
    fs.writeFileSync('./mocks/todo.json', JSON.stringify(newTodoList))

    res.status(204).send()
    // res.send({ message: 'this is in delete method' })
})

const port = 9999;
app.listen(port, () => {
    console.log(`server starting on port ${port}`);
})