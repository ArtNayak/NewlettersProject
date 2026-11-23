const express = require('express');
const book = require('./models/Book');
const authMiddleware = require('./moddleware/authMiddleware');

const pick = (b) => ({ name: b.name, author: b.author, publisher: b.publisher, imamge: b.imamge, quantity: b.quantity, category: b.category });

const router = express.Router();

// get all books
router.get('/books', async (req, res) => {
    try {
        const books = await book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get book by id

router.get('/books/:id', async (req, res) => {
    try {
        const bookId =  await book.findById(req.params.id);
        if (!bookId) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
});

// add a new book
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newBook = new book(pick(req.body));
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
});

// update a book
router.put('/:id', authMiddleware, async (req, res) => {
try {
    const bookId = await book.findByIdAndUpdate(req.params.id, pick(req.body), { new: true });
    if (!bookId) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
}catch(error){
    res.status(500).json(error);
}
});

// delete a book
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const bookId = await book.findByIdAndDelete(req.params.id);
        if (!bookId) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;