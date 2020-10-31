const db = require("../models/index");

const getAllTodos = async (req, res) => {
    const allTodos = await db.Todo.findAll({ where: { person_id: req.user.id } });
    res.status(200).send(allTodos);
}

const getTodoById = async (req, res) => {
    const targetId = req.params.id;
    const targetTodo = await db.Todo.findOne({ where: { id: targetId } });

    if (targetTodo && targetTodo.person_id === req.user.id) {
        res.status(200).send(targetTodo);
    } else {
        res.status(404).send({ message: `Not found Todo in ID : ${targetId}` });
    }
}

const createTodo = async (req, res) => {
    const { task } = req.body;
    const newTodo = await db.Todo.create({ task, person_id: req.user.id });
    res.status(201).send(newTodo);
}

const updateTodo = async (req, res) => {
    const { task } = req.body;
    const targetId = req.params.id;

    //* UPDATE แบบแรก
    // try {
    //     await db.Todo.update({
    //         task
    //     }, {
    //         where: { id: targetId }
    //     });
    //     res.status(200).send({message : "OK"})
    // } catch (err) {
    //     res.status(500).send(err)
    // }

    //* UPDATE แบบสอง (นิยม)
    const targetTodo = await db.Todo.findOne({ where: { id: targetId } });

    if (targetTodo && targetTodo.person_id === req.user.id) {
        await targetTodo.update({ task });
        res.status(200).send({ message: "OK" });
    } else {
        res.status(404).send({ message: `Not found ID : ${targetId}` });
    }
}

const deleteTodo = async (req, res) => {
    const targetId = req.params.id;
    const targetTodo = await db.Todo.findOne({ where: { id: targetId } });

    if (targetTodo && targetTodo.person_id === req.user.id) {
        targetTodo.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: `Not found ID : ${targetId}` });
    }
}



module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };