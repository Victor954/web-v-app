import {db} from '@/scripts/mongo';

import * as tokensService from './tokens.service';

import ServerError from '@/domain/errors/ServerError';
import { User } from '@/domain/types/identity.types';
import { generateAccessToken , generateRefreshToken } from '@/test/helpers/tokensFactory';
import { useFakeMongo } from '@/test/hooks';

useFakeMongo();

const user:User = { 
	login: 'userTokens', 
	passwordHash: 'someHash',
	salt: 'someSalt',
	refreshToken: generateRefreshToken({ 
		claims: { 
			login: 'userTokens' , 
			roles: []
		} , 
		options: { 
			expiresIn: '7 days' 
		} 
	}),
	roles: [] 
};

afterEach(async () => {
	await db.UserModel.deleteOne({login: user.login});
});

describe('testing refreshTokenAsync' , () => {

	test('testing with obsolete accessToken' , async () => {

		const obsoleteAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '-5 min' } });

		await db.UserModel.collection.insertOne(user);

		const result = await tokensService.refreshTokenAsync({ 
			accessToken: obsoleteAccessToken, 
			refreshToken: user.refreshToken, 
			login: user.login 
		});

		expect(result).toBeValidTokens(user.login);
	});

	test('testing with normal accessToken' , async () => {

		const normalAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });
		
		await db.UserModel.collection.insertOne(user);

		const result = await tokensService.refreshTokenAsync({ 
			accessToken: normalAccessToken, 
			refreshToken: user.refreshToken, 
			login: user.login 
		});

		expect(result).toBeValidTokens(user.login);
	});

	test('testing with obsolete refreshToken' , async () => {

		try {
			const obsoleteAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '-5 min' } });
			const obsoleteRefreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '-1 days' } });

			await db.UserModel.collection.insertOne(user);

			await tokensService.refreshTokenAsync({ 
				accessToken: obsoleteAccessToken, 
				refreshToken: obsoleteRefreshToken, 
				login: user.login 
			});

		} catch(error) {
			expect(error).toEqual(
				new ServerError({
					message: 'token is invalid',
					code: 'token_error',
					statusCode: 400
				})
			);
		}
	});

	test('testing with custom tokens' , async () => {

		const claims = { login: user.login , roles: [] };
        
		const hackingAccessToken = generateAccessToken({ claims , key: 'HACK_KEY' , options: { expiresIn: '5 min' } });
		const hackingRefreshToken = generateRefreshToken({ claims , key: 'HACK_KEY' , options: { expiresIn: '7 days' } });

		try {
			await tokensService.refreshTokenAsync({ 
				accessToken: hackingAccessToken, 
				refreshToken: hackingRefreshToken, 
				login: claims.login 
			});
		} catch(error) {
			expect(error).toEqual(
				new ServerError({
					message: 'token is invalid',
					code: 'token_error',
					statusCode: 400
				})
			);
		}
	});
});

describe('testing divideToken' , () => {
	test('divide token with current user' , async () => {

		const { insertedId } = await db.UserModel.collection.insertOne(user);

		const result = await tokensService.divideTokenAsync(user.login);
		const userDb = await db.UserModel.findOne({ _id: insertedId } , { refreshToken: 1 });

		expect(result).toBe(true);
		expect(userDb?.refreshToken).toBeNull();
	});

	test('divide token with no exist user' , async () => {
		try {
			await tokensService.divideTokenAsync(user.login);
		} catch(error) {
			expect(error).toEqual(new ServerError({
				message: 'user is not exist',
				code: 'token_error',
				statusCode: 400
			}));
		}
	});
});