import { validation } from '@/scripts/helpers/express/validation';
import { Handler } from 'express';
import Joi from 'joi';

export function bodyValidate<T>(schema: Joi.ObjectSchema<T>): Handler {
	return validation('body' ,schema);
}

export function queryValidate<T>(schema: Joi.ObjectSchema<T>): Handler {
	return validation('query' ,schema);
}

export function paramsValidate<T>(schema: Joi.ObjectSchema<T>): Handler {
	return validation('params' ,schema);
}