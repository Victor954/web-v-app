import dotenv from 'dotenv';

import { connectAsync } from './mongo';
import logger from '@/logger/console.log';
import { createExpress } from './app';

(async function main() {
    const config = dotenv.config();

    if(!config.parsed) throw config.error;

    await connectAsync();

    const app = createExpress();

    app.listen(5000 , 'localhost' , () => {
        logger.info('http://localhost:5000/api-docs');
    });
}());
