const fs = require('fs')

const todoLists = JSON.parse(fs.readFileSync("./mocks/todo.json"));

exports.validateId = (req, res, next) => {
    const id = +req.params.id;
    const index = todoLists.findIndex(ele => ele.id === id)

    if (index === -1) {
        return res.status(404).send({ message: 'Invalid Id' });
    }

    req.index = index;
    next();
}
exports.getTodos = (req, res) => {
    const searchTask = req.query.search;

    if (searchTask) {
        const filteredTodoLists = todoLists.filter(elem => elem.task.includes(searchTask))
        return res.status(200).send(filteredTodoLists)
    }

    res.status(200).send(todoLists);
}
exports.getTodo = (req, res) => {
    const todo = todoLists.filter(elem => elem.id === +req.params.id)

    res.status(200).send({ todo: todo[0] })
}
exports.createTodo = (req, res, next) => {
    const newId = todoLists.length > 0 ? todoLists[todoLists.length - 1].id + 1 : 0;
    const newTodoList = { id: newId, task: req.body.task }

    todoLists.push(newTodoList)

    fs.writeFileSync('./mocks/todo.json', JSON.stringify(todoLists))

    res.status(201).send({ todo: newTodoList })
}
exports.updateTodo = (req, res, next) => {
    todoLists[req.index].task = req.body.task;

    fs.writeFileSync('./mocks/todo.json', JSON.stringify(todoLists))

    res.status(200).send(todoLists.filter(ele => ele.id === +req.params.id))
}
exports.deleteTodo = (req, res, next) => {
    const newTodoList = todoLists.filter(elem => elem.id !== +req.params.id)

    fs.writeFileSync('./mocks/todo.json', JSON.stringify(newTodoList))
    res.status(204).send()                                                 //! status 204 จะไม่ต้องส่งค่ากลับ
}