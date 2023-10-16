const { Todo } = require("../models");
const asyncMiddleware = require("../middlewares/asyncMiddleware");

// Getting all todos
const getAllTodos = asyncMiddleware(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Todo.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  });

  const totalPages = Math.ceil(count / limit);

  const hasNextPage = page < totalPages;
  const nextPage = hasNextPage ? page + 1 : null;

  const hasPreviousPage = page > 1;
  const previousPage = hasPreviousPage ? page - 1 : null;

  res.status(200).json({
    total: count,
    totalPages,
    currentPage: page,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    data: rows,
  });
});

// Adding new todo
const createTodo = asyncMiddleware(async (req, res, next) => {
  if (!req.body.todo) {
    return res
      .status(400)
      .json({ error: "Invalid data", message: "Todo is a required filed" });
  }

  const todo = req.body;
  todo.isDone = false;

  const savedTodo = await Todo.create(todo);

  res.status(200).json({
    message: "Todo added successfully",
    data: savedTodo,
  });
});

// Get single todo
const getSingleTodo = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(todo);
});

// Delete todo
const deleteTodo = asyncMiddleware(async (req, res, next) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: "ID is required" });
  }
  const id = req.params.id;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  await todo.destroy();
  res.status(200).json({ message: "Todo deleted" });
});

// Update todo
const updateTodo = asyncMiddleware(async (req, res, next) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: "ID is required" });
  }
  const id = req.params.id;
  const { todo } = req.body;

  const currentTodo = await Todo.findByPk(id);

  if (!currentTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const updatedTodo = await currentTodo.update({
    todo,
  });

  res.status(200).json({ message: "Todo Updated", data: updatedTodo });
});

// Complete todo
const markAsDone = asyncMiddleware(async (req, res, next) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: "Invalid data", error: "ID is required" });
  }
  const id = req.params.id;

  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const updatedTodo = await todo.update({
    isDone: true,
  });

  res
    .status(200)
    .json({ message: "Todo is marked as completed", data: updatedTodo });
});

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getSingleTodo,
  markAsDone,
};
