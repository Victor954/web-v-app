import { TokenClaims } from '@/domain/types/tokens.types';
import jwt from 'jsonwebtoken';

type Options = {
    claims: TokenClaims;
    key?: string;
    options?:  jwt.SignOptions & { key?: string }
}

const defaultAccessTokenOptions: jwt.SignOptions = {
	expiresIn: '5 min',
};

const defaultRefreshTokenOptions: jwt.SignOptions = {
	expiresIn: '7 days'
};


export function generateAccessToken({ claims , key , options }: Options) {
	return jwt.sign(
		claims, 
		key || process.env.ACCESS_SECRET_KEY, 
		options || defaultAccessTokenOptions
	);
}

export function generateRefreshToken({ claims, key  , options }: Options) {
	return jwt.sign(
		claims, 
		key || process.env.REFRESH_SECRET_KEY, 
		options || defaultRefreshTokenOptions
	);
}