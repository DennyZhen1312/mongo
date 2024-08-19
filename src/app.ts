import express, { NextFunction, Request, Response } from 'express';
import { apiRouter } from './routes';
import { CustomError } from './errors/custom-error';
import { connectDB } from './config/db';

export const app = express();

app.use(express.json());

connectDB();

app.use('/api/v1', apiRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error);
  }
});