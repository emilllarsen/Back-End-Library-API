import { db } from "../config/db.js";

export async function getAllBooks() {
  return await db.collection("books").find().limit(10).toArray();
}

function _getBooksStatPipeline() {
  const msPerDay = 1000 * 60 * 60 * 24;
  const sixMonthsAgo = new Date(Date.now() - msPerDay * 180); // Got an error here, needed to out it inside a ()

  return [
    {
      $match: { borrowedDate: { $gt: sixMonthsAgo } },
    },
    {
      $group: {
        _id: "$bookId",
        nOfTimesBorrowed: { $sum: 1 },
        avgBorrowDay: {
          $avg: {
            $divide: [
              { $subtract: ["$returnedDate", "$borrowedDate"] },
              msPerDay,
            ],
          },
        },
        borrowers: {
          $addToSet: "$borrower",
        },
      },
    },
    {
      $project: {
        nOfTimesBorrowed: 1,
        avgBorrowDay: 1,
        nOfBorrowers: {
          $size: "$borrowers",
        },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "bookId",
        as: "book",
      },
    },
    {
        $unwind: {
            path: "$book"
        }
    }
  ];
}

export async function getAllBooksStats() {
  const pipeline = _getBooksStatPipeline();
  return db.collection("loans").aggregate(pipeline).toArray();
}

export async function calcPerBookStats(bid) {
  // all the logic related to calculating exports
  const pipeline = _getBooksStatPipeline();
  // making sure that the stats are for one user only
  const stage1BookOnly = { $match: { borrower: bid } };
  pipeline.unshift(stage1BookOnly); // inserting "stage1UserOnly" as the 1st item in the array of stages (within the pipeline)
  return db.collection("loans").aggregate(pipeline).toArray();
}

export function getABook(bid) {
  return {
    bid: 1,
    Title: "A Game of Thrones",
    Author: "George R R Martin",
    ReleaseDate: 1996,
  };
}

export function checkBookExist(bid) {
  if (bid > 0 && bid < 100) {
    return true;
  }
  throw new Error(`The book with id ${bid} does not exist!`);
}

export async function createBook(bookObj) {
  console.log("New book is to be created!", bookObj);
  const book = {
    bookid: Math.floor(Math.random() * 10000),
    title: bookObj.title,
    author: bookObj.author,
    releaseYear: bookObj.release_year,
  };

  const res = await db.collection("books").insertOne(book);
  if (res.acknowledged) {
    return book.bookid;
  }
  return false;
}

export function checkTitleExist(title) {
  // Make this real. This is just a hard coded toy !
  if (title === "Fire and Blood") {
    return true;
  }
  return false;
}

export default {
  getABook,
  checkBookExist,
  checkTitleExist,
  createBook,
  getAllBooks,
  getAllBooksStats,
};
