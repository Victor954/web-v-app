import SchemaError from '@/domain/errors/SchemaError';
import { Handler, Request } from 'express';
import Joi from 'joi';

export function validation<T>(key: keyof Request ,  schema: Joi.ObjectSchema<T>) : Handler {
	return async (req ,res , next) => {
		try {
			await schema.validateAsync(req[key]);
			next();
		}
		catch(error) {
			next(new SchemaError((error as Joi.ValidationError).message));
		}
	};
}