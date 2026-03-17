import { matchedData } from "express-validator";
import bookServices from "../services/v1.books.services.js";



export async function getAllBooks(req, res) {
  const bookObjList = await bookServices.getAllBooks();
  res.json(bookObjList);
}

export function getBook(req, res) {
  const bid = req.params.bid;
  console.log("Getting a book with the id: ", bid);
  const bookObj = bookServices.getABook(bid);
  res.json({ msg: `Getting book: ` + bookObj, ...bookObj });
}

export function getLoanedBook(req, res) {
  res.json({ msg: `all books that is loaned: ${req.params.bid}` });
}

export async function createBook(req, res) {
  const data = matchedData(req);
  const newBookId = await bookServices.createBook(data);
  if (newBookId) {
    res.status(201).json({ msg: "Book created: ", newBookId });
  }
}

export function updateBook(req, res) {
  res.status(200).json({ msg: `Book is updated!` });
}

export default {
  getAllBooks,
  getBook,
  getLoanedBook,
  createBook,
  updateBook,
};
