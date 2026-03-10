export function getABook(bid){
    return {bid: 1, Title: "A Game of Thrones", Author: "George R R Martin", ReleaseDate: 1996 }
}

export function checkBookExist(bid) {
    if(bid > 0 && bid < 100){
        return true
    }
    throw new Error(`The book with id ${bid} does not exist!`);
}

export function createBook(bookObj){
    console.log("New book is to be created!", bookObj);
    return Math.floor(Math.random() * 100000)
}

export function checkTitleExist(title){
    // Make this real. This is just a hard coded toy !
    if(title === "Fire and Blood"){
        return true
    }
    return false;
}


export default {
    getABook,
    checkBookExist,
    checkTitleExist,
    createBook
}