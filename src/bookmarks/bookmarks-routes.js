const express = require("express");
const bookRouter = express.Router();
const { bookmarks } = require("../store");
const bodyParser = express.json();
const uuid = require("uuid/v4");

bookRouter.use(express.json());

bookRouter
  .route("/bookmarks")
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, description, url, rating } = req.body;
    req.body.id = uuid();
    if (!title) {
      res.status(404).send("please enter title");
    }
    if (!description) {
      res.status(404).send("please enter description");
    }
    if (!url) {
      res.status(404).send("please enter url");
    }
    if (!rating) {
      res.status(404).send("please enter rating");
    } else {
      req.body.rating = parseInt(req.body.rating);
    }
    bookmarks.push(req.body);
    res.status(200).send("success");
  });

bookRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    const bookId = req.params;
    const book = bookmarks.findIndex(
      (book) => book.id.toString() === bookId.id
    );
    if (book === -1) {
      res.status(404).send(`book ${bookId.id} not found`);
    }
    res.send(bookmarks[book]);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const index = bookmarks.findIndex(
      (book) => book.id.toString() == id.toString()
    );

    if (index === -1) {
      res.status(404).send(`book ${id} not found`);
    }

    bookmarks.splice(index, 1);
    res.status(200).send(bookmarks);
  });

module.exports = bookRouter;
