const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    publicationYear: {
        type: Number
    },
    imageUrl: {
        type: String
    },
    ISBN: {
        type: Number,
        unique: true
    },
    description: {
        type: String
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
