import { Request, Response } from 'express';
import { Author } from '../models/Author';
import { Book } from '../models/Book';
import { handleError } from '../utils/errorHandler';

let books: Book[] = []; 
let authors: Author[] = [];

export const getAllAuthors = (req: Request, res: Response) => {
  try {
    const authorsWithBooks: Author[] = authors.map((author) => {
      const authorBooks: Book[] = books.filter((book) => book.authors.includes(author));
      return {
        ...author,
        books: authorBooks,
      };
    });

    res.status(200).json(authorsWithBooks);
  } catch (error) {
    handleError(res, 500, 'Error al obtener los autores con sus libros');
  }
};

export const createAuthor = (req: Request, res: Response) => {
  try {
    const { name }: { name: string } = req.body;

    if (!name) {
      handleError(res, 400, 'El campo "name" es obligatorio');
      return;
    }

    const newAuthor: Author = {
      id: authors.length + 1,
      name,
      books: []
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  } catch (error) {
    handleError(res, 500, 'Error al crear el autor');
  }
};
