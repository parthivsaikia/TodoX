const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projects");
const todoRoutes = require("./routes/todos");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
app.use(cors())
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/projects", projectRoutes);
app.use('/apis/todos', todoRoutes)
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;