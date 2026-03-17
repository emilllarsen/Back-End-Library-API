import { db } from "../config/db.js";
import crypto from "crypto";

// define all business logic related to manipulating user-related information
// note that the functions here do not have access to (request, response)
// They simply receive relevant to them pieces of information
// Given to them by controllers
function _getUserStatPipeline() {
  /**
   * We need to:
   *  * Have an aggregation pipeline
   *  * We only want to analyze records for the last half year!
   *  * We want stats per user
   * * We want a full user info, not just uid
   **  we want the following info
   *   * Number of borrowed books
   *  *  Number of all borrows (not just unique books, some books may have been borrowed twice or more)
   * *   Total /avg / longest overdue
   **  We want to hide pwd and loaned books from the returned data!
   */
  const msPerDay = 1000 * 60 * 60 * 24;
  const sixMonthsAgo = Date.now() - msPerDay * 180; // This contains the number of ms since 1970 till half a year ago from today!
  return [
    // only records of borrows in the last half year will be passed on to the next stage
    { $match: { borrowedDate: { $gt: new Date(sixMonthsAgo) } } },
    {
      $group: {
        _id: "$borrower",
        numBorrows: { $sum: 1 },
        borrowedBooks: { $addToSet: "$bookId" },
        totDaysLate: { $sum: "$daysOverdue" },
        avgDaysLate: { $avg: "$daysOverdue" },
        longestDaysLate: { $max: "$daysOverdue" },
      },
    },
    // changing the shape of the data for the next stage <-- it's run per record/document - as everything else
    {
      $project: {
        numBorrows: 1,
        totDaysLate: 1,
        avgDaysLate: 1,
        longestDaysLate: 1,
        numUniqueBorrows: { $size: "$borrowedBooks" },
      },
    },
    // we want to add some more meaningful user info - $lookup
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "uid",
        as: "user",
      },
    },
    // replacing the array in record.user with the 1st user info - as an object
    {
      $unwind: {
        path: "$user",
      },
    },
    // excluding undesired info from the final returned data
    {
      $project: {
        "user.pwd": 0,
        "user.loaned_books": 0,
      },
    },
  ];
}
export async function calcAllUserStats() {
  // same as calcPerUserStats, but does it for all users - so it returns an array
  const pipeline = _getUserStatPipeline();
  return (
    db
      .collection("loans")
      // this array needs to contain all the different stages of "aggregation"
      .aggregate(pipeline)
      .toArray()
  );
}

export async function calcPerUserStats(uid) {
  // all the logic related to calculating exports
  const pipeline = _getUserStatPipeline();
  // making sure that the stats are for one user only
  const stage1UserOnly = { $match: { borrower: uid } };
  pipeline.unshift(stage1UserOnly); // inserting "stage1UserOnly" as the 1st item in the array of stages (within the pipeline)
  return db.collection("loans").aggregate(pipeline).toArray();
}

export async function getAllUsers() {
  return await db.collection("users").find().limit(10).toArray();
}

export async function getAUser(uid) {
  return await db.collection("users").findOne({ uid });
  // FIX
  // sending a request to DB to get a specific users
}

export async function createUser(usrObj) {
  console.log("New user is to be created!", usrObj);
  const user = {
    username: usrObj.username,
    email: usrObj.email,
    pwd: crypto.createHash("md5").update(usrObj.pwd).digest("hex"),
    uid: Math.round(Math.random() * 100000),
  };

  const res = await db.collection("users").insertOne(user);
  if (res.acknowledged) {
    // if operation succeeded w return an id to find the new user by
    return user.uid;
  }
  return null;
}

export async function checkUserExist(uid) {
  // FIX
  const usr = await db.collection("users").findOne({ uid });
  if (usr) {
    return true;
  }
  throw new Error(`The user with id ${uid} does not exist!`);
}

export function checkUsernameExist(username) {
  // NOTE: NOT A REAL CHECK FOR NOW!
  // FIX: Make it real!
  // TODO: Make it better
  if (username === "Emil") {
    return true;
  }
  return false;
}

export default {
  getAUser,
  checkUserExist,
  checkUsernameExist,
  createUser,
  getAllUsers,
  calcAllUserStats,
};
