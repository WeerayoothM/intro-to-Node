const db = require("../models");

const getAllTodos = async (req, res) => {
    const allTodos = await db.Todo.findAll({ where: { user_id: req.user.id } });
    res.status(200).send(allTodos)
};

const getTodoById = async (req, res) => {
    const targetId = req.params.id;
    const targetTodo = await db.Todo.findOne({ where: { id: targetId } });

    if (targetTodo) {
        res.status(200).send(targetTodo)
    } else {
        res.status(400).send({ message: `Not found ID: ${targetId}` })
    }
};

const createTodo = async (req, res) => {
    const { task } = req.body;
    const newTodo = await db.Todo.create({ task, user_id: req.user.id })
    res.status(201).send(newTodo)
};

const updateTodo = async (req, res) => {
    const targetId = req.params.id;
    const { task } = req.body;
    const targetTodo = await db.Todo.findOne({ where: { id: targetId } });

    if (targetTodo) {
        targetTodo.update({ task })
        res.status(200).send({ message: "Updated" })
    } else {
        res.status(400).send({ message: `Not found ID: ${targetId}` })
    }

};

const deleteTodo = async (req, res) => {
    const targetId = req.params.id;
    const targetTodo = await db.Todo.findOne({ where: { id: targetId } });

    if (targetTodo) {
        targetTodo.destroy()
        res.status(204).send()
    } else {
        res.status(400).send({ message: `Not found ID: ${targetId}` })
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};