import { Handler } from 'express';
import Joi from 'joi';

import SchemaError from '@/domain/errors/SchemaError';

function bodyValidate<T>(schema: Joi.ObjectSchema<T>): Handler {
	return async (req ,res , next) => {
		try {
			await schema.validateAsync(req.body);
			next();
		}
		catch(error) {
			next(new SchemaError((error as Joi.ValidationError).message));
		}
	};
}

export default bodyValidate;