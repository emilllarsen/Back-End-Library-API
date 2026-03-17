import { param, body } from "express-validator";
import { checkBookExist } from "../services/v1.books.services.js";

export function validateBid() {
  return [
    param("bid")
      .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER })
      .withMessage("Book IDs is supposed to be integers larger than 0!")
      .bail()
      .toInt()
      .custom(checkBookExist),
  ];
}

export function validateBook() {
  return [
    body("author")
      .escape()
      .isString()
      .withMessage("Author must be a string!")
      .isLength({ min: 5 })
      .withMessage("Author name has to be longer than 5 characters!")
      .bail(),
    body("title")
      .escape()
      .isString()
      .withMessage("Title must be a string!")
      .isLength({ min: 2 })
      .withMessage("Title has to be longer than 2 words!"),
    body("isbn")
      .isInt()
      .trim()
      .escape()
      .isLength({ min: 13, max: 13 })
      .withMessage("ISBN numbers has to be 13 numbers long")
      .toInt(),
    body("release_year")
      .isInt()
      .trim()
      .escape()
      .isLength({min: 4, max: 4})
      .withMessage("Release year has to be 4 numbers long!")
      .toInt()
  ];
}

export default {
  validateBid,
  validateBook,
};
