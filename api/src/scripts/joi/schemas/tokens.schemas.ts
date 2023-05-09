import Joi from 'joi';
import { RefreshToken } from '../../../domain/types/request/tokens.types';

export const tokensSchema = Joi.object<RefreshToken>({
	accessToken : Joi.string()
		.required(),

	refreshToken: Joi.string()
		.required(),
});