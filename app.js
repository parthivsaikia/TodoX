const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projects");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/users")
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const loginRouter = require("./routes/login");

mongoose.set("strictQuery", false);

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(`${config.MONGODB_URI}/TodoAppDB`)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor)

app.use("/projects", projectRoutes);
app.use("/todos", todoRoutes);
app.use("/users", userRoutes)
app.use("/login",loginRouter)
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
