require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const validateBearerToken = require("./auth");
const errorHandler = require("./errorHandler");
const logger = require("./logger");
const bookRouter = require("./bookmarks/bookmarks-routes");

const app = express();

const morganOption = NODE_ENV === "production";
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => validateBearerToken(req, res, next));

app.use(bookRouter);

app.get("/", (req, res) => {
  res.send("Hello, boilerplate!");
});

app.use((error, req, res, next) => errorHandler(error, req, res, next));

module.exports = app;
