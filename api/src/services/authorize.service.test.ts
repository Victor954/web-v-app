import * as authorizeService from './authorize.service';
import { connectAsync , closeAsync, db} from '../scripts/mongo';
import ServerError from '@/domain/errors/ServerError';

beforeAll(async () => {
	await connectAsync();
});

afterAll(async () => {
	await closeAsync();
});

const loginError = new ServerError({
	code: 'authorize_error',
	message: 'not valid login or password',
	statusCode: 400
});

const validLogin = 'user';
const validPassword = 'qwerty12345';

describe('testing registerAsync' , () => {
	test('testing register new user' , async () => {
		const result  = await authorizeService.registerAsync({ login: validLogin , password: validPassword , repeatedPassword: validPassword });

		const registeredUser = await db.UserModel.findOne({ login: validLogin });

		expect(registeredUser).toEqual(
			expect.objectContaining({      
				login: validLogin,
				salt: expect.any(String),
				passwordHash: expect.any(String),
				refreshToken: result.refreshToken,
				roles: [],
			})
		);

		expect(result).toBeValidTokens(validLogin);
	});

	test('testing register new user with roles' , async () => {

		const user = { 
			login: 'userWithRoles' , 
			password: validPassword , 
			repeatedPassword: validPassword , 
			roles: ['admin' , 'dev_lead'] 
		};

		const result  = await authorizeService.registerAsync(user);

		const registeredUser = await db.UserModel.findOne({ login: user.login });

		expect(registeredUser).toEqual(
			expect.objectContaining({      
				login: user.login,
				salt: expect.any(String),
				passwordHash: expect.any(String),
				refreshToken: result.refreshToken,
				roles: user.roles,
			})
		);
        
		expect(result).toBeValidTokens(user.login);
	});

	test('testing with exist login' , async () => {
        
		const expectError = new ServerError({
			code: 'authorize_error',
			message: 'user with same login is exist',
			statusCode: 400
		});

		try {
			await authorizeService.registerAsync({ login: validLogin , password: validPassword , repeatedPassword: validPassword });
		} catch(error) {
			expect(error).toEqual(expectError);
		}
	});

	test('testing with not equals password and repeatedPassword' , async () => {
        
		const expectError = new ServerError({
			code: 'authorize_error',
			message: 'passwords is not equals',
			statusCode: 400
		});

		try {
			await authorizeService.registerAsync({ login: 'user3' , password: validPassword , repeatedPassword: 'qwerty' });
			throw Error('user has been registered!');
		} catch(error) {
			expect(error).toEqual(expectError);
		}
	});
});

describe('testing loginAsync' , () => {

	test('testing with invalid login' , async () => {

		try {
			await authorizeService.loginAsync({ login: 'user2' , password: validPassword });
		} catch(error) {
			expect(error).toEqual(loginError);
		}
	});

	test('testing with invalid password' , async () => {
		try {
			await authorizeService.loginAsync({ login: validLogin , password: 'qwerty' });
		} catch(error) {
			expect(error).toEqual(loginError);
		}
	});

	test('testing with valid credential' , async () => {

		const prevTokenDb = await findRefreshTokenAsync(validLogin);
		const result  = await authorizeService.loginAsync({ login: validLogin , password: validPassword });
		const nextTokenDb = await findRefreshTokenAsync(validLogin);

		expect(prevTokenDb).not.toBe(nextTokenDb);
		expect(result).toBeValidTokens(validLogin);
	});
});



async function findRefreshTokenAsync(login: string) {
	const result =  await db.UserModel.findOne({ login: login } , {
		refreshToken: 1
	});

	return result?.refreshToken;
}