
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/borrow/:bookId', authController.authenticate, authController.borrowBook);
router.post('/return/:bookId', authController.authenticate, authController.returnBook);

module.exports = router;