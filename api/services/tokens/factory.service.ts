import { Tokens } from '@/domain/types/response/tokens.types';
import { TokenClaims } from '@/domain/types/tokens.types';
import jwt from 'jsonwebtoken';

export function generateAccessToken({ login , roles } : TokenClaims) {
    return jwt.sign(
        { login , roles } , 
        process.env.ACCESS_SECRET_KEY, 
        { expiresIn: '5 min' }
    );
}

export function generateRefreshToken({ login , roles } : TokenClaims) {
    return jwt.sign(
        { login , roles } , 
        process.env.REFRESH_SECRET_KEY, 
        { expiresIn: '7 days' }
    );
}

export function generateTokens({ login , roles } : TokenClaims): Tokens {
    const accessToken = generateAccessToken({ login , roles });
    const refreshToken = generateRefreshToken({ login , roles });

    return {
        accessToken,
        refreshToken
    }
}