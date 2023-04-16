import Joi from 'joi';
import { Login , Register } from '@/domain/types/request/authorize.types';

export const loginSchema = Joi.object<Login>({
	login : Joi.string()
		.alphanum()
		.min(3)
		.max(150)
		.required(),

	password: Joi.string()
		.alphanum()
		.min(8)
		.max(150)
		.required()
});

export const registerSchema = Joi.object<Register>({
	login : Joi.string()
		.alphanum()
		.min(3)
		.max(150)
		.required(),

	password: Joi.string()
		.alphanum()
		.min(8)
		.max(150)
		.required(),

	repeatedPassword: Joi.string()
		.valid(Joi.ref('password'))
		.required(),

	roles: Joi.array().items(Joi.string())
});