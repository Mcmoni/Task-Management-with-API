import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
    return;
  }

  // Handle unexpected errors
  // eslint-disable-next-line no-console
  console.error('Unexpected error:', err);
  
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error',
  });
};