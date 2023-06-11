import { TokenClaimsDTO } from 'ts-domain-types/server.types';
import * as factoryService from '@/services/tokens/factory.service';
import jwt from 'jsonwebtoken';
import moment from 'moment';

type Token = jwt.JwtPayload & TokenClaimsDTO;

const claims: TokenClaimsDTO = {login: 'user' , roles: ['admin']};

describe('testing tokens factory service' , () => {

	test('testing generateAccessToken' , () => {

		const iat = moment().unix();
		const exp = moment().add(5, 'minute').unix();
	
		const expectToken: Token =  {
			iat: iat,
			login: claims.login,
			roles: claims.roles,
			exp: exp
		};
	
		const accessToken = factoryService.generateAccessToken(claims);
		const token = jwt.decode(accessToken) as Token;
	
		expect(token).toEqual(expectToken);
	
	});
	
	test('testing generateRefreshToken' , () => {
	
		const iat = moment().unix();
		const exp = moment().add(7, 'day').unix();
	
		const expectToken: Token =  {
			iat: iat,
			login: claims.login,
			roles: claims.roles,
			exp: exp
		};
	
		const refreshToken = factoryService.generateRefreshToken(claims);
		const token = jwt.decode(refreshToken) as Token;
	
		expect(token).toEqual(expectToken);
	
	});
});

