import { connect as connectDB, close as closeDB, db } from "../config/db.js";
import { generateLoans } from './seed.helper.js';
import userArray from "./users.json" with { type: "json" };
import booksArray from "./books.json" with { type: "json" };
//import loansArray from "./loans.json" with { type: "json" };

const loanArray = generateLoans(userArray, booksArray);

await connectDB();



// Doing useful work, aka seeding the database
//db.dropDatabase();
const users = db.collection("users");
const books = db.collection("books");
const loans = db.collection("loans");

async function dropColl(coll) {
  try {
    await coll.drop();
  } catch (err) {
    // there was not a collection to drop -
    console.log("Likely no collection to drop: ", err);
  };
}
for(let coll of [users, books, loans]){
  await dropColl(coll);
}



// Inserting new users
try {
  await users.insertMany(userArray);
  await books.insertMany(booksArray);
  await loans.insertMany(loanArray);
  console.log("Users and books inserted successfully");
} catch (err) {
  console.error("Could not insert new users: ", err);
} finally {
  await closeDB(); // Closing a connection regardless of the success/failure of operations
}

await closeDB();
