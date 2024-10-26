const todoRouter = require("express").Router();
const todo = require("../models/todo");
const Todo = require("../models/todo");

todoRouter.get("/:projectId", (request, response, next) => {
  Todo.find({ projectId: request.params.projectId })
    .then((todoList) => response.json(todoList))
    .catch((error) => next(error));
});

todoRouter.post("/:projectId", (request, response, next) => {
  const todo = new Todo({
    ...request.body,
    projectId: request.params.projectId,
  });
  todo
    .save()
    .then((savedTodo) => response.json(savedTodo))
    .catch((error) => next(error));
});

todoRouter.delete("/:id", (request, response, next) => {
  Todo.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(400).json({ error: "Todo not found" });
      }
    })
    .catch((error) => next(error));
});

todoRouter.put("/:id", (request, response, next) => {
  const todo = request.body;
  if (!todo.name || !todo.dueDate || !todo.completed || !todo.projectId) {
    response.status(400).json({ error: "All the parameters are required." });
  }
  Todo.findByIdAndUpdate(request.params.id, todo, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedTodo) => {
      if (updatedTodo) {
        response.json(updatedTodo);
      } else {
        response.status(404).json({ error: "Todo not found." });
      }
    })
    .catch((error) => next(error));
});

module.exports = todoRouter;
