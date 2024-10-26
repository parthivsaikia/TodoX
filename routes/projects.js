const express = require('express')
const projectRouter = express.Router()
const Project = require('../models/project')
const { error } = require('../utils/logger')

projectRouter.get('/', (request, response, next) => {
    Project
        .find({})
        .then(projectList => response.json(projectList))
        .catch((error) => next(error))
})

projectRouter.post('/', (request, response, next) => {
    const project = new Project({
        name: request.body.name,
    })
    project
        .save()
        .then(savedProject => response.json(savedProject))
        .catch(error => next(error))
})

projectRouter.delete('/:id', (request, response, next) => {
    Project.findByIdAndDelete(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end()
            }
            response.status(404).json({error: 'Person not found.'})
        })
        .catch(error => next(error))
})

projectRouter.put('/:id', (request, response, next) => {
    const { name } = request.body
    if (!name) {
        return response.status(400).json({error: 'name is required'})
    }
    const project = {name}
    Project.findByIdAndUpdate(request.params.id, project, {
        new: true, 
        runValidators: true,
        context:'query'
    })
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(400).json({ error: 'Person not found.'})
            }
        })
        .catch(error => next(error))
})

module.exports = projectRouter