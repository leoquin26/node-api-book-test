import { Response } from 'express';

export const validateAuthor = (name: string, res: Response): boolean => {
  if (!name) {
    res.status(400).json({ error: 'El campo "name" es requerido' });
    return false;
  }
  return true;
};

export const validateBook = (title: string, chapters: number, pages: number, authors: number[], res: Response): boolean => {
  if (!title || !chapters || !pages || !authors) {
    res.status(400).json({ error: 'Todos los campos son requeridos' });
    return false;
  }
  return true;
};
