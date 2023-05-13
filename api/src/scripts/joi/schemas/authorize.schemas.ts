import Joi from 'joi';
import { Login , Register } from '@/domain/types/request/authorize.types';
import { PersonInfo } from '@/domain/types/identity.types';

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

const personInfoSchema = {
	name: Joi.string()
		.pattern(/^[А-я]+$/)
		.min(2)
		.max(150)
		.required(),
	surname: Joi.string()
		.pattern(/^[А-я]+$/)
		.min(3)
		.max(150)
		.required(),
	patronymic: Joi.string()
		.pattern(/^[А-я]+$/)
		.min(5)
		.max(150)
		.allow(null)
		.default(null)
};

export const registerSchema = Joi.object<Register>({
	login: Joi.string()
		.alphanum()
		.min(3)
		.max(150)
		.required(),
		
	name: Joi.string()
		.pattern(/^[А-я]+$/)
		.min(2)
		.max(150)
		.required(),

	surname: Joi.string()
		.pattern(/^[А-я]+$/)
		.min(3)
		.max(150)
		.required(),

	patronymic: Joi.string()
		.pattern(/^[А-я]+$/)
		.min(5)
		.max(150)
		.allow(null)
		.default(null),

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