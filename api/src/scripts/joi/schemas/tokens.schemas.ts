import Joi from 'joi';
import { RefreshTokenReqDto } from 'ts-domain-types/request/tokens.types';

export const tokensSchema = Joi.object<RefreshTokenReqDto>({
	accessToken : Joi.string()
		.required(),

	refreshToken: Joi.string()
		.required(),
});