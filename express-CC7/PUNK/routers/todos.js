const express = require('express');
const { reduceRight } = require('lodash');
const router = express.Router();

const { uniqueId } = require("lodash");

let todos = [];

//* Read
router.get('/', (req, res) => {
    res.status(200).send(todos)
})

//* Read 1 Element
router.get('/:id', (req, res) => {
    const targetId = req.params.id
    const targetTodo = todos.filter(todo => todo.id === targetId)
    res.status(200).send(targetTodo)
})

//* Create
router.post('/', (req, res) => {
    const { task } = req.body
    const newTodo = { id: uniqueId(), task };
    todos.push(newTodo)
    res.status(201).send(newTodo)
})

//* Edit
router.put('/:id', (req, res) => {
    const targetId = req.params.id;
    const idx = todos.findIndex(todo => todo.id === targetId);
    const { task } = req.body;
    todos[idx] = { id: targetId, task }
    res.status(200).send("success")
})

//* Delete
router.delete('/:id', (req, res) => {
    const targetId = req.params.id;
    todos = todos.filter(todo => todo.id !== targetId)
    res.status(204).send()
})

module.exports = router;