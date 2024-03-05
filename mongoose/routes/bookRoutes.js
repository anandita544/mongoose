
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add', bookController.addBook);
router.put('/:id/update', bookController.updateBook);
router.delete('/:id/delete', bookController.deleteBook);
router.get('/:id', bookController.findBookById);

module.exports = router;




