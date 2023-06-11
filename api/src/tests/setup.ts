import dotenv from 'dotenv';
import path from 'path';
import matches from './helpers/matches';
import createExpress from '@/tests/server.t';

process.env.MONGO_URL = global.__MONGO_URI__;
dotenv.config({ path: path.resolve(__dirname, 'settings', '.env') });

global.app = createExpress();

expect.extend(matches);