const bcrypt = require("bcrypt");
const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const userList = await User.find({}).populate('projects')
  response.json(userList)

})

usersRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = usersRouter
