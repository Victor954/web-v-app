import { User } from '@/domain/types/identity.types';
import UserModel from '@/scripts/mongo/models/identity/UserModel';
import { useFakeMongo  } from '@/tests/helpers/hooks';
import request from 'supertest';

import * as encodePassword from '@/services/encode/encodePassword.service';
import * as factoryTokens from '@/services/tokens/factory.service';
import { Login } from '@/domain/types/request/authorize.types';

useFakeMongo();

describe('testing /api/v1/management/authorize/login' , () => {
	const url = '/api/v1/management/authorize/login';

	const spyEncode = jest.spyOn(encodePassword , 'encodeAsync');
	const spyFactoryTokens = jest.spyOn(factoryTokens , 'generateTokens');

	const authorizeError = {
		code: 'authorize_error',
		message: 'Неверный логин или пароль',
	};

	const tokens = {
		refreshToken: 'refreshToken1',
		accessToken: 'accessToken1'
	};

	beforeAll(async () => {
		const users:User[] = [
			{
				login: 'User',
				passwordHash: 'passwordHash',
				refreshToken: 'some_refreshToken',
				salt: 'salt',
				roles: ['admin']
			},
			{
				login: 'CasualUser',
				passwordHash: 'passwordHash',
				refreshToken: 'some_refreshToken',
				salt: 'salt',
				roles: []
			}
		];

		await UserModel.insertMany(users);
		spyFactoryTokens.mockReturnValue(tokens);
	});

	afterAll(async () => {
		await UserModel.deleteMany({});
		spyFactoryTokens.mockClear();
	}); 

	afterEach(async () => {
		spyEncode.mockClear();
	}); 

	test('testing login as User with roles great 0' , async () => {

		const login = 'User';

		const response = await makeRequestAsync({
			login: login, 
			password: 'passwordHash'
		});

		const updatedUser = await UserModel.findOne({ login });

		await expect(updatedUser?.refreshToken).toBe(tokens.refreshToken);
		await expect(response.statusCode).toBe(200);
		await expect(response.body).toEqual(tokens);
	});

	test('testing login as User with invalid password' , async () => {
		const response = await makeRequestAsync({
			login: 'User', 
			password: 'invalidPassword'
		});

		await expect(response.statusCode).toBe(400);
		await expect(response.body).toEqual(authorizeError);
	});

	test('testing login as User with roles equals 0' , async () => {

		const response = await makeRequestAsync({
			login: 'CasualUser', 
			password: 'passwordHash'
		});

		await expect(response.statusCode).toBe(400);
		await expect(response.body).toEqual(authorizeError);
	});
	
	async function makeRequestAsync(login: Login) {
		spyEncode.mockReturnValue(Promise.resolve(login.password));

		const response = await request(global.app)
			.post(url)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send(login);

		return response;
	}
});