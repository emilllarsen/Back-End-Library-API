import { param, body } from "express-validator";

/**
 * Validate book ID parameter
 */
export function validateBid() {
  return [
    param("bid")
      .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER })
      .withMessage("Book IDs is supposed to be integers larger than 0!")
      .toInt()
  ];
}

/**
 * Validate incoming book object
 * Expected shape:
 * {
 *   title: string,
 *   author: string,
 *   isbn: number (13 digits)
 * }
 */
export function validateBook(){
    return [
        body("title")
            .trim()
            .escape()
            .notEmpty().withMessage("Title is required")
            .isLength({ min: 1, max: 200 }).withMessage("Title must be between 1 and 200 characters"),
        body("author")
            .trim()
            .escape()
            .notEmpty().withMessage("Author is required")
            .isLength({ min: 2, max: 100 }).withMessage("Author name must be between 2 and 100 characters"),
        body("isbn")
            .isInt().withMessage("ISBN must be a valid integer")
            .toInt()
            .custom(value => {
                const isbnStr = value.toString();
                return isbnStr.length === 13 || isbnStr.length === 10;
            })
            .withMessage("ISBN must be either 10 or 13 digits")
    ];
}

export default {
  validateBid,
  validateBook
};
