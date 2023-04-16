import dotenv from 'dotenv';
import path from 'path';
import matches from './matches';

process.env.MONGO_URL = global.__MONGO_URI__;
dotenv.config({ path: path.resolve(__dirname, 'settings', 'test.env') });

expect.extend(matches);