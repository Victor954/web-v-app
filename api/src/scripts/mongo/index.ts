import logger from '@/scripts/logger/console.log';
import mongoose from 'mongoose';

let mongo: typeof mongoose | null = null;

export async function connectAsync() {

	try {
		mongo = await mongoose.connect(process.env.MONGO_URL);
	} catch(err) {
		logError(err);
	}
}

export async function closeAsync() {
	try {
		await mongo?.connection.close();
	} catch(err) {
		logError(err);
	}
}

export default {
	connectAsync,
	closeAsync
};

function logError(err: Error | any) {
	if(err instanceof Error) {
		logger.error(err.message);
	} else {
		logger.error(err);
	}
}