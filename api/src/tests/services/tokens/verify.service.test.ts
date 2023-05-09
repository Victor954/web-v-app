import { TokenClaims } from '@/domain/types/tokens.types';
import * as verifyService from '@/services/tokens/verify.service';
import jwt from 'jsonwebtoken';

type Token = jwt.JwtPayload & TokenClaims;

const claims: TokenClaims = {login: 'user' , roles: ['admin']};

const expectToken: Token =  {
	login: claims.login,
	roles: claims.roles,
};

describe('testing verifyAccessToken' , () => {

	test('testing with valid token' , () => {
		const accessToken = jwt.sign(claims , process.env.ACCESS_SECRET_KEY);
		const token = verifyService.verifyAccessToken(accessToken);

		expect(token).toMatchObject(expectToken);

	});

	test('testing with invalid token' , () => {
		try {
			const accessToken = jwt.sign(claims , process.env.ACCESS_SECRET_KEY , { expiresIn: '-3 days' });
			verifyService.verifyAccessToken(accessToken);
		} catch(error) {
			expect(error instanceof jwt.TokenExpiredError).toBe(true);
		}
	});
});

describe('testing verifyRefreshToken' , () => {

	test('testing with valid token' , () => {
		const refreshToken = jwt.sign(claims , process.env.REFRESH_SECRET_KEY);
		const token = verifyService.verifyRefreshToken(refreshToken);
        
		expect(token).toMatchObject(expectToken);
	});

	test('testing with invalid token' , () => {
		try {
			const refreshToken = jwt.sign(claims , process.env.REFRESH_SECRET_KEY , { expiresIn: '-3 days' });
			verifyService.verifyRefreshToken(refreshToken);
		} catch(error) {
			expect(error instanceof jwt.TokenExpiredError).toBe(true);
		}
	});
});