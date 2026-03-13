import { db } from "../config/db.js";
import crypto from "crypto";

// define all business logic related to manipulating user-related information
// note that the functions here do not have access to (request, response)
// They simply receive relevant to them pieces of information
// Given to them by controllers

export async function getAllUsers() {
  return await db.collection("users").find().limit(10).toArray();
}

export async function getAUser(uid) {
    return await db.collection("users").findOne({shortid: uid})
  // FIX
  // sending a request to DB to get a specific user
  //return { name: "Emil", uid: 1, status: "Not very happy for now..." };
}

export async function createUser(usrObj) {
  //console.log("New user is to be created!", usrObj);
  const user = {
    username: usrObj.username,
    email: usrObj.email,
    pwd: crypto.createHash("md5").update(usrObj.pwd).digest("hex"),
    shortid: Math.round(Math.random() * 100000),
  };

  const res = await db.collection("users").insertOne(user);
  if (res.acknowledged) {
    // if opperation succeeded w return an id to find the new user by
    return user.shortid;
  }

  // If the operation fiales, we something!
  return null;
  //return Math.round(Math.random() * 100000); // just mimicking creating a user and returning the new userId
}

export async function checkUserExist(uid) {
  // FIX
  const usr = await db.collection("users").findOne({ shortid: uid });
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
};
