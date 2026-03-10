import express from "express";
import uController from "../controllers/v1.user.controller.js";
import bController from "../controllers/v1.book.controller.js";

import { validate } from "../validators/v1.validate.js";

import userValidator from "../validators/v1.user.validator.js";
const apiV1Router = express.Router();

apiV1Router.use(express.json())

// Assigning handlers to routes
apiV1Router.get("/users", uController.getAllUsers);
apiV1Router.get(
  "/users/:uid",
  userValidator.validateUid(),
  validate,
  uController.getUser,
);

apiV1Router.get(
  "/users/:uid/loans",
  userValidator.validateUid(),
  validate,
  uController.getLoans,
);

apiV1Router.post(
  "/users",
  userValidator.validateUser(),
  validate,
  uController.createUser,
); // Create a new user

apiV1Router.put(
  "/users/:uid",
  userValidator.validateUid(),
  validate,
  uController.updateUser,
); // Updating a specific user

apiV1Router.post(
  "/users/:uid/loans",
  userValidator.validateLoanId(),
  validate,
  uController.loanBook,
); // Adding a book to a list of loaned books to a specific user

apiV1Router.delete(
  "/users/:uid/loans/:loanid",
  userValidator.validateUid(),
  userValidator.validateLoanId(),
  validate,
  uController.unloanBook,
); // removing a book from the list of loaned books for a specific user

apiV1Router.get("/books", bController.getAllBooks);
apiV1Router.get("/books/:bid", bController.getBook);
apiV1Router.get("/books/:loans", bController.getLoanedBook);

apiV1Router.post("/books", bController.createBook); // Create a new book
apiV1Router.put("/books/:bid", bController.updateBook); // Updating a specific book

export default apiV1Router;
