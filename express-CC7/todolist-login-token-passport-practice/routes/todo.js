const router = require("express").Router();
const jwt = require("jsonwebtoken");
const todoControllers = require("../controllers/todo");
const db = require("../models");

function extractToken(req) {
    const headerAuth = req.headers["authorization"].split(" ");
    return headerAuth[1];
}

const auth = (req, res, next) => {
    try {
        const token = extractToken(req);
        const payload = jwt.verify(token, "SONTER");
        db.User.findOne({ where: { id: payload.id } })
            .then((targetUser) => {
                req.user = targetUser;
                next();
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Should not be here." });
            });

    } catch (err) {
        console.log(err);
        res.status(401).send("Unauthorized");
    }
};

router.get("/", auth, todoControllers.getAllTodos);
router.get("/:id", auth, todoControllers.getTodoById);
router.post("/", auth, todoControllers.createTodo);
router.put("/:id", auth, todoControllers.updateTodo);
router.delete("/:id", auth, todoControllers.deleteTodo);

module.exports = router;
