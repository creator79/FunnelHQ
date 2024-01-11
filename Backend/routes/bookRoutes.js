import express from 'express';
import BookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/get', BookController.getBooks);
router.post('/add', BookController.addBook);

export default router;
