const jwt = require('jsonwebtoken');
const Book = require('../models/book');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'your_secret_key');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (!book.isAvailable) {
            throw new Error('Book is not available for borrowing');
        }
        book.isAvailable = false;
        await book.save();
        res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.isAvailable) {
            throw new Error('Book is already available');
        }
        book.isAvailable = true;
        await book.save();
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};