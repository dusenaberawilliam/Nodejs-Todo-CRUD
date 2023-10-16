const express = require("express");
const router = express.Router();

const todosController = require("../controllers/todos-controller");

router.get("/all-todos", todosController.getAllTodos);

router.post("/create", todosController.createTodo);

router.delete("/:id", todosController.deleteTodo);

router.put("/:id", todosController.updateTodo);

router.get("/:id", todosController.getSingleTodo);

router.put("/make-done/:id", todosController.markAsDone);

module.exports = router;
