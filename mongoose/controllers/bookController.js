const Book = require('../models/book');

exports.addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
