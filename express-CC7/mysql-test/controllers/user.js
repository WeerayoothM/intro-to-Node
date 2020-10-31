const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res) => {
    const { username, password, name, age } = req.body;
    const targetUser = await db.Person.findOne({ where: { username } });
    if (targetUser) {
        res.status(400).send({ message: "Username already taken" })
    } else {

        //? แบบไม่ sync
        const hashedPassword = bcryptjs.genSalt(12, (err, salt) => {
            bcryptjs.hash(password, salt, async (err, hash) => {
                await db.Person.create({
                    username,
                    name,
                    age,
                    password: hash
                });
            })
        })

        //? แบบ sync
        // const salt = bcryptjs.genSaltSync(12);
        // const hashedPassword = bcryptjs.hashSync(password, salt);

        // await db.Person.create({
        //     username,
        //     name,
        //     age,
        //     password: hashedPassword
        // });

        res.status(201).send({ message: " User created" })
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const targetUser = await db.Person.findOne({ where: { username } });
    if (!targetUser) {
        res.status(400).send({ message: "Username not found" })
    } else {
        const isCorrect = bcryptjs.compareSync(password, targetUser.password);
        if (isCorrect) {
            //* Login success
            const payload = {
                id: targetUser.id,          //* important
                name: targetUser.name
            }
            const token = jwt.sign(payload, process.env.SECRETORKEY, { expiresIn: 3600 })
            res.status(200).send({ token })
        } else {
            res.status(400).send({ message: "Incorrect Password" })
        }
    }

};

module.exports = { register, login }