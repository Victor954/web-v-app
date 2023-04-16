import { Tokens } from '@/domain/types/response/tokens.types';
import { verifyAccessToken, verifyRefreshToken } from '@/services/tokens/verify.service';

export function toBeValidTokens(received: Tokens , toBeLogin: string) {

	const verAccessToken = verifyAccessToken(received.accessToken);
	const verRefreshToken = verifyRefreshToken(received.refreshToken);

	const pass = verAccessToken.login === toBeLogin && verRefreshToken.login === toBeLogin;

	return {
		pass: pass,
		message:() => `Expected ${toBeLogin} but got: acc = ${verAccessToken.login} ref = ${verRefreshToken.login} `
	};
}
