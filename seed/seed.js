import { connect as connectDB, close as closeDB, db } from "../config/db.js";
import userArray from "./users.json" with { type: "json" };

await connectDB();

// Doing useful work, aka seeding the database
//db.dropDatabase();
const users = db.collection("users");
try {
  await users.drop();
} catch (err) {
  // there wasent a collection to drop -
  console.log("Likely no collection to drop: ", err);
}

// Inserting new users

try {
  await users.insertMany(userArray);
  console.log("Users inserted successfully")
} catch (err) {
  console.error("Could not insert new users: ", err);
} finally {
  await closeDB(); // Closing a connection regardless of the success/failure of operations
}

await closeDB();
