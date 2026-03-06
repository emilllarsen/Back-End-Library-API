import express from "express";
import uController from "../controllers/v1.user.controller.js";
import bController from "../controllers/v1.book.controller.js";

const apiV1Router = express.Router();


// Assigning handlers to routes
apiV1Router.get("/users", uController.getAllUsers);
apiV1Router.get("/users/:uid", uController.getUser);
apiV1Router.get("/users/:uid/loans", uController.getLoans);


apiV1Router.post("/users", uController.createUser) // Create a new user
apiV1Router.put("/users/:uid", uController.updateUser) // Updating a specific user



apiV1Router.post("/users/:uid/loans", uController.loanBook); // Adding a book to a list of loaned books to a specific user
apiV1Router.delete("/users/:uid/loans/:loanid", uController.unloanBook); // removing a book from the list of loaned books for a specific user





apiV1Router.get("/books", bController.getAllBooks);
apiV1Router.get("/books/:bid", bController.getBook);
apiV1Router.get("/books/:loans", bController.getLoanedBook);

apiV1Router.post("/books", bController.createBook) // Create a new book
apiV1Router.put("/books/:bid", bController.updateBook) // Updating a specific book



export default apiV1Router;

