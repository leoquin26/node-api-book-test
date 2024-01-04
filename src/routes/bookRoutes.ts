import express from 'express';
import { createBook, getAllBooks } from '../controllers/bookController';

export const bookRouter = express.Router();

bookRouter.post('/', createBook);
bookRouter.get('/', getAllBooks);
