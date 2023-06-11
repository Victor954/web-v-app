import { TokenClaimsDTO } from 'ts-domain-types/server.types';
import jwt from 'jsonwebtoken';

type Token = jwt.JwtPayload & TokenClaimsDTO;

export function verifyAccessToken(token: string): Token {
	return jwt.verify(token , process.env.ACCESS_SECRET_KEY) as Token;
}

export function verifyRefreshToken(token: string): Token {
	return jwt.verify(token , process.env.REFRESH_SECRET_KEY) as Token;
}