import mongo from '@/scripts/mongo';
import UserModel from '@/scripts/mongo/models/identity/UserModel';
import { User } from '@/domain/types/identity.types';
import { generateAccessToken , generateRefreshToken } from '@/tests/helpers/tokensFactory';
import { makePostRequestAsync } from '@/tests/helpers/requestExpress';

const refreshToken = generateRefreshToken({ 
	claims: { 
		login: 'userTokens', 
		personInfo: {
			name: 'Иван',
			surname: 'Иванов',
			patronymic: 'Иванович'
		},
		roles: []
	} , 
	options: { 
		expiresIn: '7 days' 
	} 
});

const user:User = { 
	login: 'userTokens', 
	personInfo: {
		name: 'Иван',
		surname: 'Иванов',
		patronymic: 'Иванович'
	},
	passwordHash: 'someHash',
	salt: 'someSalt',
	refreshToken: refreshToken,
	roles: [] 
};

beforeAll(async () => {
	await mongo.connectAsync();
});

afterAll(async () => {
	await mongo.closeAsync();
});

describe('testing /api/v1/tokens/refresh' , () => {

	beforeEach(async () => {
		const userModel = new UserModel(user);
		await userModel.save();
	});
	
	afterEach(async () => {	
		await UserModel.deleteMany({});
	});

	const url = '/api/v1/tokens/refresh';

	test('testing with obsolete accessToken' , async () => {

		const obsoleteAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '-5 min' } });

		const response = await makePostRequestAsync({
			body: {
				accessToken: obsoleteAccessToken, 
				refreshToken: refreshToken, 
			},
			contentType: 'application/json',
			url: url
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeValidTokens(user.login);
	});

	test('testing with normal accessToken' , async () => {

		const normalAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });
	
		const response = await makePostRequestAsync({
			body: {
				accessToken: normalAccessToken, 
				refreshToken: user.refreshToken,
			},
			contentType: 'application/json',
			url: url
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toBeValidTokens(user.login);
	});

	test('testing with obsolete refreshToken' , async () => {

		const obsoleteAccessToken = generateAccessToken({ claims: user , options: { expiresIn: '-5 min' } });
		const obsoleteRefreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '-1 days' } });

		const response = await makePostRequestAsync({
			body: {
				accessToken: obsoleteAccessToken, 
				refreshToken: obsoleteRefreshToken,
			},
			contentType: 'application/json',
			url: url
		});

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			code: 'token_error', 
			message: 'token is invalid'
		});
	});

	test('testing with custom tokens' , async () => {

		const claims = { login: user.login , personInfo: { name: 'Иванов' , surname: 'Иван'}, roles: [] };
        
		const hackingAccessToken = generateAccessToken({ claims , key: 'HACK_KEY' , options: { expiresIn: '5 min' } });
		const hackingRefreshToken = generateRefreshToken({ claims , key: 'HACK_KEY' , options: { expiresIn: '7 days' } });

		const response = await makePostRequestAsync({
			body: {
				accessToken: hackingAccessToken, 
				refreshToken: hackingRefreshToken, 
			},
			contentType: 'application/json',
			url: url
		});

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			code: 'token_error', 
			message: 'token is invalid'
		});
	});
});

describe('testing /api/v1/tokens/divide' , () => {

	const url = '/api/v1/tokens/divide';

	beforeAll(async () => {
		const userModel = new UserModel(user);
		await userModel.save();
	});
	
	afterAll(async () => {
		await UserModel.deleteMany({});
	});

	test('divide token with current user' , async () => {

		const accessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });

		console.log(refreshToken);

		const response = await makePostRequestAsync({
			body: {
				accessToken: accessToken, 
				refreshToken: refreshToken, 
			},
			bearerToken: accessToken,
			contentType: 'application/json',
			url: url
		});

		const updatedUser = await UserModel.findOne({ login: user.login } , { refreshToken: 1 });

		expect(response.statusCode).toBe(200);
		expect(response.text).toBe('divided');
		expect(updatedUser?.refreshToken).toBeNull();
	});

	test('divide token with invalid refreshToken' , async () => {

		const accessToken = generateAccessToken({ claims: user , options: { expiresIn: '5 min' } });
		const refreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '7 d' } });

		const response = await makePostRequestAsync({
			body: {
				accessToken: accessToken, 
				refreshToken: refreshToken, 
			},
			bearerToken: accessToken,
			contentType: 'application/json',
			url: url
		});

		expect(response.statusCode).toBe(400);
		expect(response.body).toEqual({
			message: 'user is not exist',
			code: 'token_error',
		});
	});

	test('divide token with invalid user' , async () => {

		const accessToken = generateAccessToken({ 
			claims: { 
				login: 'Hacker' , 
				roles: ['admin'] , 
				personInfo: { 
					name: 'Иванов' , 
					surname: 'Иван'
				}} , 
			options: { expiresIn: '5 min' } 
		});

		const refreshToken = generateRefreshToken({ claims: user , options: { expiresIn: '7 d' } });

		const response = await makePostRequestAsync({
			body: {
				accessToken: accessToken, 
				refreshToken: refreshToken, 
			},
			bearerToken: accessToken,
			contentType: 'application/json',
			url: url
		});

		expect(response.statusCode).toBe(401);
	});
});
