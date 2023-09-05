import express from "express";
import bookModel from '../models/book.js' 
import { body, validationResult} from 'express-validator';

const router = express.Router();

const isValidYear = (value) => {
    if (!/^\d{4}$/.test(value)) {
        throw new Error('Invalid year format. Year should be in YYYY format.');
    }
    return true;
};

//Route 1 : Saving a book in database;
router.post('/savebook', [
    body("title", "Enter a valid title").isLength({min: 1}),
    body("author", "Enter a valid author").isLength({min: 1}),
    body("publishedAt", "Enter a valid year").custom(isValidYear)
    ], async (req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.errors[0].msg})
        }
        const newBook = await bookModel.create({
            title: req.body.title,
            author: req.body.author,
            publishedAt: req.body.publishedAt
        })
        return res.status(200).send(newBook);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

//Route 2 : GET all the books
router.get('/getallbooks', async (req, res) => {
    try {
        const allBooks = await bookModel.find({});
        return res.status(200).json({totalBooks: allBooks.length, Books: allBooks});
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }

});

//Route 3 : Update book attributes
router.put('/updatebook/:id', async (req,res) => {
    try {
        if(
            !req.body.title &&
            !req.body.author &&
            !req.body.publishedAt
        ){
            return res.status(400).send("Please enter the field and value to be updated")
        }
        const bookId = req.params.id;
        const result = await bookModel.findByIdAndUpdate(bookId, req.body)
        if(result){
            return res.status(200).send([{message: "Book Updated successfully"}, {result}]);
        } 
        else{
            return res.status(404).send({message: "Book Not Found"});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
})

//Route 4 : GET a particular book using book Id
router.get('/getbook/:id', async (req,res) => {
    try {
        const bookId = req.params.id;
        const result = await bookModel.findById(bookId);
        if(result){
            return res.status(200).send({book: result});
        } 
        else{
            return res.status(404).send({message: "Book Not Found"});
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

//Route 5 : Delete a particular book using book Id
router.delete('/deletebook/:id', async (req,res) => {
    try {
        const result = await bookModel.findByIdAndDelete(req.params.id)
        if(result){
            return res.status(200).send([{message: "Book Deleted successfully"}, {result}]);
        } 
        else{
            return res.status(404).send({message: "Book Not Found"});
        } 
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

export default router;