import { config } from 'dotenv';
import path from 'path';

export const PATH = path.join(__dirname, `../.env`);

config({ path: PATH });

export const PORT = process.env.PORT || 3000;
export const ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI