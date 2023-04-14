import dotenv from 'dotenv';
import path from 'path';
import matches from './matches';
import { createExpress } from '../app';

dotenv.config({ path: path.resolve(__dirname, 'settings', 'test.env') });

process.env.MONGO_URL = global.__MONGO_URI__;
global.app = createExpress();

expect.extend(matches);