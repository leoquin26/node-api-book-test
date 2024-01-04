import express from 'express';
import { createAuthor, getAllAuthors } from '../controllers/authorController';

export const authorRouter = express.Router();

authorRouter.post('/', createAuthor);
authorRouter.get('/', getAllAuthors);
