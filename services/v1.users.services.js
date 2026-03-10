// define all business logic related to manipulating user-related information
// note that the functions here do not have access to (request, response)
// They simply receive relevant to them pieces of information
// Given to them by controllers

export function getAUser(uid){
    // sending a request to DB to get a specific user
    return {name: "Emil", uid: 1, status: "Not very happy for now..." }
}

export function createUser(usrObj){
    console.log("New user is to be created!", usrObj)
    return Math.round(Math.random() * 100000) // just mimicking creating a user and returning the new userId
}


export function checkUserExist(uid){
    if(uid > 0 && uid < 100){
        return true
    }
    throw new Error(`The user with id ${uid} does not exist!`);
}


export function checkUsernameExist(username){
    // NOTE: NOT A REAL CHECK FOR NOW!
    // FIX: Make it real!
    // TODO: Make it better
    if(username === "Emil"){
        return true
    }
    return false
}

export default {
    getAUser,
    checkUserExist,
    checkUsernameExist,
    createUser
}