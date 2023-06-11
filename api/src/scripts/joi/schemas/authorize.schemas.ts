import Joi from 'joi';
import { LoginReqDTO , RegisterReqDTO } from 'ts-domain-types/request/authorize.types';

export const loginSchema = Joi.object<LoginReqDTO>({
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

export const loginParamsSchema = Joi.object<{ type: string }>({
	type: Joi.string()
		.pattern(/casual|manager/)
		.required()
});

export const registerSchema = Joi.object<RegisterReqDTO>({
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