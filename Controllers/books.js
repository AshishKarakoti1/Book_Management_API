const Book = require('../Models/book');

async function getAllBooks(req, res) {
    const { genre, author, publication, page = 1 } = req.query;

    const limit = 5;
    const startIdx = (Number(page) - 1) * limit;
    const endIdx = startIdx + limit;

    try {
        let query = {};

        if (genre) query.genre = genre;
        if (author) query.author = author;
        if (publication) query.publication = Number(publication);

        const allBooks = await Book.find(query);
        const pagedBooks = allBooks.slice(startIdx, endIdx);

        res.status(200).json({ success: true, books: pagedBooks });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching books' });
    }
}

async function addNewBook(req, res) {
    try {
        const { title, author, genre, publication, imageUrl, ISBN, description } = req.body;

        if (!title || !author || !ISBN) {
            return res.status(400).json({ success: false, message: 'Title, Author, and ISBN are required fields.' });
        }

        const newBook = new Book({
            title,
            author,
            genre: genre || '',
            publication: publication || null,
            imageUrl: imageUrl || '',
            ISBN: ISBN || null,
            description: description || '',
        });

        await newBook.save();

        res.status(201).json({ success: true, message: 'Book added successfully!', book: newBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error adding the book' });
    }
}

async function getBookById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Please provide a valid ID' });
    }

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({ success: true, book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching the book', error: err.message });
    }
}

async function updateBookById(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: 'Please provide a valid ID' });

    const { title, author, genre, publication, imageUrl, ISBN, description } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        book.publication = publication || book.publication;
        book.imageUrl = imageUrl || book.imageUrl;
        book.ISBN = ISBN || book.ISBN;
        book.description = description || book.description;

        await book.save();
        res.json({ success: true, message: 'Book updated successfully', book });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating the book' });
    }
}

async function deleteBookById(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: 'Please provide a valid ID' });

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.json({ success: true, message: 'Book deleted successfully', book: deletedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error deleting the book' });
    }
}

async function searchBook(req, res) {
    const { ISBN } = req.query;
    if (!ISBN) return res.status(400).json({ success: false, message: 'Please provide a valid ISBN number' });

    try {
        const book = await Book.findOne({ ISBN });
        if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: `Book with ISBN number ${ISBN}`, book });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching the book' });
    }
}

module.exports = {
    getAllBooks,
    addNewBook,
    getBookById,
    updateBookById,
    deleteBookById,
    searchBook
};
