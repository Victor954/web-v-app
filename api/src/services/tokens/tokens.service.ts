
import ServerError from '@/domain/errors/ServerError';
import { RefreshToken } from '@/domain/types/request/tokens.types';
import { Tokens } from '@/domain/types/response/tokens.types';
import { db } from '@/scripts/mongo';
import { TokenExpiredError } from 'jsonwebtoken';
import { generateTokens } from './factory.service';
import { verifyAccessToken, verifyRefreshToken } from './verify.service';

export async function refreshTokenAsync({ accessToken , refreshToken , login }: RefreshToken): Promise<Tokens> {
	const user = await db.UserModel.findOne({ login });

	const at = hasExpired(accessToken, verifyAccessToken);
	const rt = hasExpired(refreshToken, verifyRefreshToken);

	const isValidAccessToken = at instanceof Error !== true;
	const isValidRefreshToken = rt === false && refreshToken === user!.refreshToken;

	if(user && isValidAccessToken && isValidRefreshToken) {
        
		const tokens = generateTokens(user);
        
		await user.updateOne({
			$set: {
				refreshToken: tokens.refreshToken
			}
		});

		return tokens;
	}

	throw new ServerError({
		message: 'token is invalid',
		code: 'token_error',
		statusCode: 400
	});
}

export async function divideTokenAsync(login: string): Promise<boolean> {

	const user = await db.UserModel.findOneAndUpdate({ login } , {
		refreshToken: null
	} , { new: true });

	if(!user) throw new ServerError({
		message: 'user is not exist',
		code: 'token_error',
		statusCode: 400
	});

	return user.refreshToken === null;
}

/**
 * 
 * @param token токен
 * @param verifyFn функция валидации
 * @returns { Date | false | Error} Date - время когда токен устарел , false - успешная валидация , Error - другая ошибка валидации
 */
function hasExpired(token: string ,verifyFn: (token:string) => any) : Date | false | Error{
	try {
		verifyFn(token);
	} catch(error) {

		if(error instanceof TokenExpiredError) {
			return error.expiredAt;
		}

		return error as Error;
	}

	return false;
}

