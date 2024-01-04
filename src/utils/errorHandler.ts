import { Response } from 'express';

export const handleError = (res: Response, statusCode: number, message: string): void => {
  res.status(statusCode).json({ error: message });
};

export const handleInternalServerError = (res: Response): void => {
  res.status(500).json({ error: 'Internal server error' });
};
