const express = require('express');
const Router = express.Router();
const {handleGetAllBooks,handleAddNewBook,handleGetBookById,handleUpdateBookByID,handleDeleteBookById,handleSearchBook} = require('../Controllers/books');
const isValidUser = require('../Middlewares/validUser');

Router.route('/')
    .get(handleGetAllBooks)
    .post(isValidUser,handleAddNewBook);

Router.route('/search')
    .get(isValidUser,handleSearchBook)

Router.route('/:id')
    .get(isValidUser,handleGetBookById)
    .put(isValidUser,handleUpdateBookByID)
    .delete(isValidUser,handleDeleteBookById);

module.exports = Router;