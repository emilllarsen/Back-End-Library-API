import bookServices from "../services/v1.books.services.js"

function getAllBooks(req, res){
    res.json({msg: "All books"});
}

function getBook(req, res){
    const bid = req.params.bid;
    console.log("Getting a book with the id: ", bid);
    const bookObj = bookServices.getABook(bid)
    res.json({msg: `Getting book: ` + bookObj, ...bookObj});
}

function getLoanedBook(req, res){
    res.json({msg: `all books that is loaned: ${req.params.bid}`});
}

function createBook(req, res){
    res.status(201).json({msg: `Book created with id: ${req.params.bid}`})
}
function updateBook(req, res){
    res.status(200).json({msg: `Book is updated!`});
}

export default {
    getAllBooks,
    getBook,
    getLoanedBook,
    createBook,
    updateBook
}

