const router = require("express").Router();
const db = require("../models");

router.get("/", async (req, res) => {
    const allPersons = await db.Person.findAll();
    res.status(200).send(allPersons);
});
router.get("/:id", async (req, res) => {
    const targetId = req.params.id;
    const targetPerson = await db.Person.findOne({ where: { id: targetId } });
    res.status(200).send(targetPerson);
});
router.post("/", async (req, res) => {
    const { name, age } = req.body;
    const newPerson = await db.Person.create({ name, age });
    res.status(201).send(newPerson);
});
router.put("/:id", async (req, res) => {
    const { name, age } = req.body;
    const targetId = req.params.id;
    const targetPerson = await db.Person.findOne({ where: { id: targetId } });
    if (targetPerson) {
        targetPerson.update({ name, age });
        res
            .status(200)
            .send({ message: `Person ID : ${targetId} has been updated` });
    } else {
        res.status(404).send({ message: `Not found ${targetId}` });
    }
});
router.delete("/:id", async (req, res) => {
    const targetId = req.params.id;
    const targetPerson = await db.Person.findOne({ where: { id: targetId } });
    if (targetPerson) {
        targetPerson.destroy();
        res
            .status(200)
            .send({ message: `Person ID : ${targetId} has been deleted` });
    } else {
        res.status(404).send({ message: `Not found ${targetId}` });
    }
});

module.exports = router;
