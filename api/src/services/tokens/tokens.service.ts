
import ServerError from '@/domain/errors/ServerError';
import { Tokens } from '@/domain/types/response/tokens.types';
import jwt ,{ TokenExpiredError , JwtPayload}  from 'jsonwebtoken';
import { generateTokens } from './factory.service';
import { verifyAccessToken, verifyRefreshToken} from './verify.service';
import UserModel from '@/scripts/mongo/models/identity/UserModel';
import { TokenClaims } from '@/domain/types/tokens.types';

const refreshError = new ServerError({
	message: 'token is invalid',
	code: 'token_error',
	statusCode: 400
});

export async function refreshTokenAsync({ accessToken , refreshToken }: Tokens): Promise<Tokens> {

	const claims = jwt.decode(accessToken) as JwtPayload & TokenClaims;
	const user = await UserModel.findOne({ login: claims.login });

	if(!user) throw refreshError;

	const at = hasExpired(accessToken, verifyAccessToken);
	const rt = hasExpired(refreshToken, verifyRefreshToken);

	const isValidAccessToken = at instanceof Error !== true;
	const isValidRefreshToken = rt === false && refreshToken === user.refreshToken;

	if(isValidAccessToken && isValidRefreshToken) {
        
		const tokens = generateTokens(user);
        
		await user.updateOne({
			$set: {
				refreshToken: tokens.refreshToken
			}
		});

		return tokens;
	}

	throw refreshError;
}

export async function divideTokenAsync(refreshToken:string , login?: string): Promise<void> {

	const test = await UserModel.find({});

	console.log(test , login , refreshToken);

	const user = await UserModel.findOneAndUpdate({ 
		login: login , 
		refreshToken 
	} , {
		refreshToken: null
	} , { new: true });

	if(!user) throw new ServerError({
		message: 'user is not exist',
		code: 'token_error',
		statusCode: 400
	});
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

