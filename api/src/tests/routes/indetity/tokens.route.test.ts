import mongo from '@/scripts/mongo';
import UserModel from '@/scripts/mongo/models/identity/UserModel';
import { User } from '@/domain/types/identity.types';
import { generateAccessToken , generateRefreshToken } from '@/tests/helpers/tokensFactory';
import request from 'supertest';

const refreshToken = generateRefreshToken({ 
	claims: { 
		login: 'userTokens' , 
		roles: []
	} , 
	options: { 
		expiresIn: '7 days' 
	} 
});

const user:User = { 
	login: 'userTokens', 
	passwordHash: 'someHash',
	salt: 'someSalt',
	refreshToken: refreshToken,
	roles: [] 
};

beforeAll(async () => {
	await mongo.connectAsync();

	await UserModel.insertMany([
		user
	]);
});

afterAll(async () => {
	
	await UserModel.deleteMany({});
	await mongo.closeAsync();
});

describe('testing /api/v1/tokens/refresh' , () => {

	const url = '/api/v1/tokens/refresh';

	test('testing with obsolete accessToken' , async () => {

		const obsoleteAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '-5 min' } });

		const response = await makePostRequestAsync({
			accessToken: obsoleteAccessToken, 
			refreshToken: refreshToken, 
		},url);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeValidTokens(user.login);
	});

	test('testing with normal accessToken' , async () => {

		const normalAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });
		
		const response = await makePostRequestAsync({
			accessToken: normalAccessToken, 
			refreshToken: user.refreshToken, 
		},url);

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeValidTokens(user.login);
	});

	test('testing with obsolete refreshToken' , async () => {

		const obsoleteAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '-5 min' } });
		const obsoleteRefreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '-1 days' } });

		const response = await makePostRequestAsync({
			accessToken: obsoleteAccessToken, 
			refreshToken: obsoleteRefreshToken, 
		},url);

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			code: 'token_error', 
			message: 'token is invalid'
		});
	});

	test('testing with custom tokens' , async () => {

		const claims = { login: user.login , roles: [] };
        
		const hackingAccessToken = generateAccessToken({ claims , key: 'HACK_KEY' , options: { expiresIn: '5 min' } });
		const hackingRefreshToken = generateRefreshToken({ claims , key: 'HACK_KEY' , options: { expiresIn: '7 days' } });

		const response = await makePostRequestAsync({
			accessToken: hackingAccessToken, 
			refreshToken: hackingRefreshToken, 
		},url);

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			code: 'token_error', 
			message: 'token is invalid'
		});
	});
});

describe('testing /api/v1/tokens/divide' , () => {

	const url = '/api/v1/tokens/divide';

	test('divide token with current user' , async () => {

		const accessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });

		console.log(refreshToken);

		const response = await makePostRequestAsync({
			accessToken: accessToken, 
			refreshToken: refreshToken, 
		},url , accessToken);

		const updatedUser = await UserModel.findOne({ login: user.login } , { refreshToken: 1 });

		expect(response.statusCode).toBe(200);
		expect(response.text).toBe('divided');
		expect(updatedUser?.refreshToken).toBeNull();
	});

	test('divide token with invalid refreshToken' , async () => {

		const accessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });
		const refreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '7 d' } });

		const response = await makePostRequestAsync({
			accessToken: accessToken, 
			refreshToken: refreshToken, 
		}, url, accessToken);

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			message: 'user is not exist',
			code: 'token_error',
		});
	});

	test('divide token with invalid user' , async () => {

		const accessToken = generateAccessToken({ claims: { login: 'Hacker' , roles: ['admin'] } , options: { expiresIn: '5 min' } });
		const refreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '7 d' } });

		const response = await makePostRequestAsync({
			accessToken: accessToken, 
			refreshToken: refreshToken, 
		}, url, accessToken);

		expect(response.statusCode).toBe(401);
	});
});

async function makePostRequestAsync<T extends object>(body: T , url: string , token?: string) {
	const response = await request(global.app)
		.post(url)
		.set('Authorization' , `Bearer ${token}`)
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.send(body);

	return response;
}