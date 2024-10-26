const todoRouter = require('express').Router()
const Todo = require('../models/todo')

todoRouter.get('/:projectId', (request, response, next) => {
    Todo
        .findById(request.params.projectId)
        .then((todoList) => response.json(todoList))
        .catch(error => next(error))
})

todoRouter.post('/:projectId', (request, response, next) => {
    const todo = new Todo({
      ...request.body,
      projectId: request.params.projectId,
    });
    todo
        .save()
        .then(savedTodo => response.json(savedTodo))
        .catch(error => next(error))
})