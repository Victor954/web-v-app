import { RefreshTokenReqDto } from 'ts-domain-types/request/tokens.types';
import { TokenClaimsDTO } from 'ts-domain-types/server.types';

import jwt from 'jsonwebtoken';

export function generateAccessToken({ login , roles , personInfo } : TokenClaimsDTO) {
	return jwt.sign(
		{ login , roles , personInfo} , 
		process.env.ACCESS_SECRET_KEY, 
		{ expiresIn: '5 min' }
	);
}

export function generateRefreshToken({ login , roles } : TokenClaimsDTO) {
	return jwt.sign(
		{ login , roles } , 
		process.env.REFRESH_SECRET_KEY, 
		{ expiresIn: '7 days' }
	);
}

export function generateTokens({ login , roles , personInfo} : TokenClaimsDTO): RefreshTokenReqDto {
	const accessToken = generateAccessToken({ login , roles , personInfo });
	const refreshToken = generateRefreshToken({ login , roles , personInfo });

	return {
		accessToken,
		refreshToken
	};
}