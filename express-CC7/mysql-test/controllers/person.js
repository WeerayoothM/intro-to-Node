const db = require("../models");

const getAllPersons = async (req, res) => {
    const allPersons = await db.Person.findAll({ include: [db.Todo] });
    res.status(200).send(allPersons);
}

const getPersonsById = async (req, res) => {
    const targetId = req.params.id;
    const targetPerson = await db.Person.findOne({ where: { id: targetId }, include: [db.Todo] });
    res.status(200).send(targetPerson);
}

const createPerson = async (req, res) => {
    const { name, age, todos } = req.body;
    const newPerson = await db.Person.create({
        name,
        age,
        Todos: todos
    }, {
        include: [db.Todo]
    });
    res.status(201).send(newPerson);
}

const updatePerson = async (req, res) => {
    const { name, age } = req.body;
    const targetId = req.params.id;
    const targetPerson = await db.Person.findOne({ where: { id: targetId } });
    if (targetPerson) {
        await targetPerson.update({ name, age });
        res.status(200).send({ message: `Person ID : ${targetId} has been updated` });
    } else {
        res.status(404).send({ message: `Not found ${targetId}` });
    }
}
const deletePerson = async (req, res) => {
    const targetId = req.params.id;
    const targetPerson = await db.Person.findOne({ where: { id: targetId } });
    if (targetPerson) {
        targetPerson.destroy();
        res.status(200).send({ message: `Person ID : ${targetId} has been deleted` });
    } else {
        res.status(404).send({ message: `Not found ${targetId}` });
    }
}

module.exports = { getAllPersons, getPersonsById, createPerson, updatePerson, deletePerson }