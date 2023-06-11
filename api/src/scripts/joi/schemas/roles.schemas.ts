import { commonReq , roleReq } from 'ts-domain-types/request';

import Joi from 'joi';

export const rolesQuerySchema = Joi.object<roleReq.RolesReqDTO>({
	code: Joi.object<commonReq.RulesReqDTO>({
		eq: Joi.string(),
		exc: Joi.array(),
	}),

	offset: Joi.number()
		.integer()
		.greater(-1),

	limit: Joi.number()
		.integer()
		.greater(-1)
});