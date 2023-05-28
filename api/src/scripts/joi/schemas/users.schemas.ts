import { UserQuery } from '@/domain/types/request/user.types';
import Joi from 'joi';

export const usersReqSchema = Joi.object<UserQuery>({
	skip : Joi.number()
		.integer()
		.greater(-1)
		.required(),

	top: Joi.number()
		.integer()
		.greater(-1)
		.required()
});