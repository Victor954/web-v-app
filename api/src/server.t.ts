import express from 'express';
import passport from 'passport';
import errorMiddleware from './middleware/error.middleware';

import routes from './routes';
import bearerStrategy from './middleware/bearerStrategy.middleware';

/**
 * генератор сервера для тестовой среды
 * @returns Express
 */
export default function createExpress() {
	const app = express();

	passport.use(bearerStrategy);

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use('/api/v1' , routes);
	app.use(errorMiddleware);

	return app;
}