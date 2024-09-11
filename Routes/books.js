const express = require('express');
const router = express.Router();
const { 
    getAllBooks, 
    addNewBook, 
    getBookById, 
    updateBookById, 
    deleteBookById, 
    searchBook 
} = require('../Controllers/books');
const validateUser = require('../Middlewares/validUser');

router.route('/')
    .get(getAllBooks)
    .post(validateUser, addNewBook);

router.route('/search')
    .get(validateUser, searchBook);

router.route('/:id')
    .get(validateUser, getBookById)
    .put(validateUser, updateBookById)
    .delete(validateUser, deleteBookById);

module.exports = router;
