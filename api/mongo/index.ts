import logger from '@/logger/console.log';
import ModelsContext from './ModelsContext';
import mongoose from 'mongoose';

let mongo!: typeof mongoose;
export let db!:ModelsContext;

export async function connectAsync() {

    try {
        mongo = await mongoose.connect(process.env.MONGO_URL);
        db = new ModelsContext();
        
    } catch(err) {
        logger.error((err as Error).message)
    }
}


export async function closeAsync() {

    try {
        await mongo.disconnect();
    } catch(err) {
        logger.error((err as Error).message)
    }
}
