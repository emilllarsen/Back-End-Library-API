import { matchedData } from "express-validator";
import userServices from "../services/v1.users.services.js";


export function getAllUsers(req, res){
    res.json({msg: "All Users!"});
}
export function getUser(req, res){
    const uid = req.params.uid;
    console.log("getting a user with the id", uid);
    const userObj = userServices.getAUser(uid);
    res.json({msg: "Something with" + userObj, ...userObj});
}

export function getLoans(req, res){
    res.json({msg: "All loans for the user: " + req.params.uis});
}

export function createUser(req, res){
    // Here we actually do something with the incoming validated data!
    const data = matchedData(req); // The data object contains all of the data fields that that we validate
    const newUserId = userServices.createUser(data);
    res.status(201).json({msg: "user Created", newUserId});
}
export function updateUser(req, res){
    res.status(200).json({msg: `User: ${req.params.uid} has been updated`});
}

export function loanBook(req, res){
    res.status(201).json({msg: `Book loaned: to user ${req.params.uid}`});
}

export function unloanBook(req, res){
    res.json({msg: `Book ${req.params.loanid} has been unborrowed by user ${req.params.uid}`});
}


export default {
    getAllUsers,
    getUser,
    getLoans,
    createUser,
    updateUser,
    loanBook,
    unloanBook
}