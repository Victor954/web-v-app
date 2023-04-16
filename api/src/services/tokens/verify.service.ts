import { TokenClaims } from '@/domain/types/tokens.types';
import jwt from 'jsonwebtoken';

type Token = jwt.JwtPayload & TokenClaims;

export function verifyAccessToken(token: string): Token {
	return jwt.verify(token , process.env.ACCESS_SECRET_KEY) as Token;
}

export function verifyRefreshToken(token: string): Token {
	return jwt.verify(token , process.env.REFRESH_SECRET_KEY) as Token;
}