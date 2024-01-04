import { Author } from './Author';

export interface Book {
    id: number;
    title: string;
    chapters: number;
    pages: number;
    authors: Author[];
  }