const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });

    if (!targetUser) {
        res.status(400).send({ message: "Not found username" });
    } else {
        if (bcryptjs.compareSync(password, targetUser.password)) {
            const token = jwt.sign({ id: targetUser.id, name: targetUser.name }, "SONTER", { expiresIn: 3600 });
            res.status(200).send({ token });
        } else {
            res.status(400).send({ message: "Wrong password" });
        }
    }
};

const register = async (req, res) => {
    const { username, password, name } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });
    if (targetUser) {
        res.status(400).send({ message: "Username alraedy taken." });
    } else {
        const salt = bcryptjs.genSaltSync(12);
        const hashedPW = bcryptjs.hashSync(password, salt);

        await db.User.create({
            username,
            name,
            password: hashedPW
        });

        res.status(201).send({ message: "User created" });
    }
};

module.exports = {
    login,
    register
};