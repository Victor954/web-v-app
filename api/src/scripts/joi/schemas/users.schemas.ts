import { UsersReqDTO } from 'ts-domain-types/request/user.types';
import Joi from 'joi';

export const usersReqSchema = Joi.object<UsersReqDTO>({
	limit : Joi.number()
		.integer()
		.greater(-1),

	offset: Joi.number()
		.integer()
		.greater(-1)
});