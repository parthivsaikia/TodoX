const User = require("../models/user");
const express = require("express");
const projectRouter = express.Router();
const Project = require("../models/project");
const { error } = require("../utils/logger");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

projectRouter.get("/", async (request, response, next) => {
  const projectList = await Project.find({}).populate("userId");
  response.json(projectList);
});

projectRouter.post("/", async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const project = new Project({
    name: request.body.name,
    userId: user,
  });
  const savedProject = await project.save();
  user.projects = user.projects.concat(savedProject._id);
  await user.save();
  response.status(201).json(savedProject);
});

projectRouter.delete("/:id", (request, response, next) => {
  Project.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      }
      response.status(404).json({ error: "Project not found." });
    })
    .catch((error) => next(error));
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
});

module.exports = projectRouter;
