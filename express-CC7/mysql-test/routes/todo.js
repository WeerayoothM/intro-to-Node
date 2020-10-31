const router = require("express").Router();
const passport = require('passport');
const { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require("../controllers/todo");

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, getAllTodos);
router.get("/:id", auth, getTodoById);
router.put("/:id", auth, updateTodo);
router.post("/", auth, createTodo);
router.delete("/:id", auth, deleteTodo);

module.exports = router;
