import ServerError from './ServerError';

export default class AuthorizeError extends ServerError {
	constructor(type: 'unauthorize' | 'forbidden') {

		const options = type === 'forbidden' ? {
			message: 'access denied',
			statusCode: 403
		} : {
			message: 'not authorized',
			statusCode: 401
		};

		super({...options , code: 'authorize_error' });
	}
}