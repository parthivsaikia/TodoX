const express = require('express')
const projectRouter = express.Router()
const Project = require('../models/project')

projectRouter.get('/', (request, response, next) => {
    Project
        .find({})
        .then(projectList => response.json(projectList))
        .catch((error) => next(error))
})

projectRouter.post('/', (request, response, next) => {
    const project = new Project({
        name: request.body.name,
        todos: []
    })
    project
        .save()
        .then(savedProject => response.json(savedProject))
        .catch(error => next(error))
})

module.exports = projectRouter