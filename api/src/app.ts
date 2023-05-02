import express from 'express';
import cors from 'cors';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc';

import errorMiddleware from './middleware/error.middleware';

import routes from './routes';
import bearerStrategy from './middleware/bearerStrategy.middleware';

export function createExpress() {
	const app = express();

	const corsMiddleware = cors({
		origin: 'http://127.0.0.1:5173'
	});

	app.use(corsMiddleware);

	passport.use(bearerStrategy);
	app.use(express.json());

	app.use('/api/v1' , routes);
	app.use(errorMiddleware);
	app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerDocument));

	return app;
}