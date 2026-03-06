// define all business logic related to manipulating user-related information
// note that the functions here do not have access to (request, response)
// They simply receive relevant to them pieces of information
// Given to them by controllers

export function getAUser(uid){
    // sending a request to DB to get a specific user
    return {name: "Emil", uid: 1, status: "Not very happy for now..." }
}

export function checkUserExist(uid){
    if(uid > 0 && uid < 100){
        return true
    }
    throw new Error(`The user with id ${uid} does not exist!`);
}

export default {
    getAUser,
    checkUserExist
}