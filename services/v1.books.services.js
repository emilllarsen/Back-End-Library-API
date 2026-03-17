import { db } from "../config/db.js";

export async function getAllBooks(){
    return await db.collection("books").find().limit(10).toArray()
}

export function getABook(bid){
    return {bid: 1, Title: "A Game of Thrones", Author: "George R R Martin", ReleaseDate: 1996 }
}

export function checkBookExist(bid) {
    if(bid > 0 && bid < 100){
        return true
    }
    throw new Error(`The book with id ${bid} does not exist!`);
}



export async function createBook(bookObj){
   console.log("New book is to be created!", bookObj);
   const book = {
    bookid: Math.floor(Math.random() * 10000),
    title: bookObj.title,
    author: bookObj.author,
    releaseYear: bookObj.release_year
   }

   const res = await db.collection("books").insertOne(book);
   if(res.acknowledged){
    return book.bookid
   }
   return false;
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
    createBook,
    getAllBooks
}