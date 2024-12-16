const User = require("../models/user");
const express = require("express");
const projectRouter = express.Router();
const Project = require("../models/project");
const { error } = require("../utils/logger");
const jwt = require("jsonwebtoken");
const middleware = require('../utils/middleware')

projectRouter.get(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user;
    const userId = user.id;
    const projectList = await Project.find({ userId: userId }).populate(
      "userId",
    );
    response.json(projectList);
  },
);

projectRouter.post("/", middleware.userExtractor, async (request, response, next) => {
  const user = request.user
  const project = new Project({
    name: request.body.name,
    userId: user,
  });
  const savedProject = await project.save();
  user.projects = user.projects.concat(savedProject._id);
  await user.save();
  response.status(201).json(savedProject);
});

projectRouter.delete("/:id", middleware.userExtractor, async(request, response, next) => {
  const user = request.user
  if (user.projects.includes(request.params.id)) {
    await Project.findByIdAndDelete(request.params.id)
    user.projects = user.projects.filter(projectId => projectId !== request.params.id)
    await user.save()
    response.status(204).end()
  }
});

projectRouter.put("/:id", (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ error: "name is required" });
  }
  const project = { name };
  Project.findByIdAndUpdate(request.params.id, project, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(400).json({ error: "Person not found." });
      }
    })
    .catch((error) => next(error));
})

module.exports = projectRouter
