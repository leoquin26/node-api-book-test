import { Request, Response } from 'express';
import { Book } from '../models/Book';
import { Author } from '../models/Author';
import { handleError } from '../utils/errorHandler';

let books: Book[] = []; 
let authors: Author[] = [];

export const getBooksWithAuthors = (req: Request, res: Response) => {
  try {
    const booksWithAuthors: Book[] = books.map((book) => {
      const bookAuthors: Author[] = book.authors.map((authorId) => {
        const author = authors.find((a) => a.id === Number(authorId));
        return author ? { ...author } : null;
      }).filter((author) => author !== null) as Author[];

      return {
        id: book.id,
        title: book.title,
        chapters: book.chapters,
        pages: book.pages,
        authors: bookAuthors,
      };
    });

    res.status(200).json(booksWithAuthors);
  } catch (error) {
    handleError(res, 500, 'Error al obtener los libros con autores');
  }
};

export const createBook = (req: Request, res: Response) => {
  try {
    const { title, chapters, pages, authors }: { title: string; chapters: number; pages: number; authors: number[] } = req.body;

    if (!validateBook(title, chapters, pages, authors, res)) {
      return;
    }

    const newBook: Book = {
      id: books.length + 1,
      title,
      chapters,
      pages,
      authors: authors.map((authorId) => authorId),
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    handleError(res, 500, 'Error al crear el libro');
  }
};

function validateBook(title: string, chapters: number, pages: number, authors: number[], res: Response): boolean {
  if (!title || !chapters || !pages || !authors || authors.length === 0) {
    handleError(res, 400, 'Todos los campos (title, chapters, pages, authors) son obligatorios');
    return false;
  }

  return true;
}
