import { UserModelDTO } from '@/domain/types/models/user.types';
import UserModel from '@/scripts/mongo/models/identity/UserModel';
import mongo from '@/scripts/mongo';
import { makePostRequestAsync } from '@/tests/helpers/requestExpress';

import * as encodePassword from '@/services/encode/encodePassword.service';
import * as factoryTokens from '@/services/tokens/factory.service';
import { LoginReqDTO , RegisterReqDTO } from 'ts-domain-types/request/authorize.types';

const spyEncode = jest.spyOn(encodePassword , 'encodeAsync');
const spyFactoryTokens = jest.spyOn(factoryTokens , 'generateTokens');

const tokens = {
	refreshToken: 'refreshToken1',
	accessToken: 'accessToken1'
};

beforeAll(async () => {

	await mongo.connectAsync();

	const users:UserModelDTO[] = [
		{
			login: 'User',
			personInfo: {
				name: 'Иван',
				surname: 'Иванов',
				patronymic: 'Иванович'
			},
			passwordHash: 'passwordHash',
			refreshToken: 'some_refreshToken',
			salt: 'salt',
			roles: ['admin']
		},
		{
			login: 'CasualUser',
			personInfo: {
				name: 'Евгений',
				surname: 'Понасенков',
			},
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

	await mongo.closeAsync();
}); 

describe('testing /api/v1/authorize/login' , () => {
	const url = '/api/v1/authorize/login';

	const authorizeError = {
		code: 'authorize_error',
		message: 'Неверный логин или пароль',
	};

	afterEach(async () => {
		spyEncode.mockClear();
	}); 

	test('testing login as User with roles' , async () => {

		const login = 'User';

		const response = await makeLoginRequest({
			login: login, 
			password: 'passwordHash'
		});

		const updatedUser = await UserModel.findOne({ login });

		await expect(updatedUser?.refreshToken).toBe(tokens.refreshToken);
		await expect(response.statusCode).toBe(200);
		await expect(response.body).toEqual(tokens);
	});

	test('testing login as User with invalid password' , async () => {
		const response = await makeLoginRequest({
			login: 'User', 
			password: 'invalidPassword'
		});

		await expect(response.statusCode).toBe(400);
		await expect(response.body).toEqual(authorizeError);
	});

	test('testing login as User with roles equals 0' , async () => {

		const login = 'CasualUser';

		const response = await makeLoginRequest({
			login, 
			password: 'passwordHash'
		});

		const updatedUser = await UserModel.findOne({ login });

		await expect(updatedUser?.refreshToken).toBe(tokens.refreshToken);
		await expect(response.statusCode).toBe(200);
		await expect(response.body).toEqual(tokens);
	});

	async function makeLoginRequest(login: LoginReqDTO) {
		spyEncode.mockReturnValue(Promise.resolve(login.password));
	
		return await makePostRequestAsync({
			body: login,
			url: url,
			contentType: 'application/x-www-form-urlencoded'
		});
	}
});

describe('testing /api/v1/authorize/register' , () => {
	const url = '/api/v1/authorize/register';

	const spyGenerateSalt = jest.spyOn(encodePassword , 'generateSalt');

	beforeAll(() => {
		spyGenerateSalt.mockReturnValue('salt');
	});
	
	afterAll(() => {
		spyGenerateSalt.mockClear();
	});

	afterEach(() => {
		spyEncode.mockClear();
	});

	test('testing register new user' , async () => {
		const register:RegisterReqDTO = {
			login: 'LoginUser1',
			name: 'Иван',
			surname: 'Иванов',
			patronymic: 'Иванович',
			password: 'Password12345',
			repeatedPassword: 'Password12345',
			roles: [],
		};

		spyEncode.mockReturnValue(Promise.resolve(register.password));
		
		const response = await makePostRequestAsync({
			body: register,
			url: url,
			contentType: 'application/x-www-form-urlencoded'
		});

		const registeredUser = await UserModel.findOne({ login: register.login });

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(tokens);
		expect(registeredUser).toEqual(
			expect.objectContaining({      
				login: register.login,
				personInfo: expect.objectContaining({
					name: 'Иван',
					surname: 'Иванов',
					patronymic: 'Иванович',
				}),
				salt: 'salt',
				passwordHash: register.password,
				refreshToken: tokens.refreshToken,
				rolesArrayLength: 0,
				roles: register.roles,
			})
		);
	});

	test('testing register new user with roles' , async () => {

		const register:RegisterReqDTO = { 
			login: 'userWithRoles', 
			name: 'Иван',
			surname: 'Иванов',
			patronymic: 'Иванович',
			password: 'Password12345',
			repeatedPassword: 'Password12345',
			roles: ['admin' , 'dev_lead'] 
		};

		spyEncode.mockReturnValue(Promise.resolve(register.password));

		const response = await makePostRequestAsync({
			body: register,
			url: url,
			contentType: 'application/x-www-form-urlencoded'
		});

		const registeredUser = await UserModel.findOne({ login: register.login });

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(tokens);
		expect(registeredUser).toEqual(
			expect.objectContaining({      
				login: register.login,
				personInfo: expect.objectContaining({
					name: 'Иван',
					surname: 'Иванов',
					patronymic: 'Иванович',
				}),
				salt: 'salt',
				passwordHash: register.password,
				refreshToken: tokens.refreshToken,
				rolesArrayLength: 2,
				roles: register.roles,
			})
		);
	});

	test('testing with exist login' , async () => {
        
		const register:RegisterReqDTO = { 
			login: 'User',
			name: 'Иван',
			surname: 'Иванов',
			patronymic: 'Иванович',
			password: 'passwordHash',
			repeatedPassword: 'passwordHash',
			roles: [] 
		};

		const response = await makePostRequestAsync({
			body: register,
			url: url,
			contentType: 'application/x-www-form-urlencoded'
		});

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			code: 'authorize_error',
			message: 'user with same login is exist'
		});
	});

	test('testing with not equals password and repeatedPassword' , async () => {
        
		const register:RegisterReqDTO = { 
			login: 'NewUser2' ,
			name: 'Иван',
			surname: 'Иванов',
			patronymic: 'Иванович',
			password: 'passwordHash',
			repeatedPassword: 'passwordHash2',
			roles: [] 
		};

		const response = await makePostRequestAsync({
			body: register,
			url: url,
			contentType: 'application/x-www-form-urlencoded'
		});

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			code: 'schema_valid_error',
			message: '"repeatedPassword" must be [ref:password]',
		});
	});
});
