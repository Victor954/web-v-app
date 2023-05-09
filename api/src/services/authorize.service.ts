import ServerError from '@/domain/errors/ServerError';
import { User } from '@/domain/types/identity.types';
import { Login, Register } from '@/domain/types/request/authorize.types';
import { Tokens } from '@/domain/types/response/tokens.types';
import { encodeAsync , generateSalt} from './encode/encodePassword.service';
import { generateTokens } from './tokens/factory.service';
import UserModel from '@/scripts/mongo/models/identity/UserModel';
import { FilterQuery } from 'mongoose';

const loginError = new ServerError({
	code: 'authorize_error',
	message: 'Неверный логин или пароль',
	statusCode: 400
});

type LoginOptions = {
	withRolesOnly?: boolean
}

export async function loginAsync({ login , password }: Login , options?: LoginOptions): Promise<Tokens> {
    
	const user = await UserModel.findOne(queryLoginFilter({login , ...options}));

	if(!user) throw loginError;
    
	const passwordHash = await encodeAsync(password , user.salt);

	if(passwordHash !== user.passwordHash) throw loginError;

	const tokens = generateTokens(user);

	await user.updateOne({
		$set: {
			refreshToken: tokens.refreshToken
		}
	});

	return tokens;
}

export async function registerAsync({
	login,
	password,
	roles
}: Register): Promise<Tokens> {
    
	const sameLoginUsersCount = await UserModel.count({ login });

	if(sameLoginUsersCount > 0) {

		throw new ServerError({
			code: 'authorize_error',
			message: 'user with same login is exist',
			statusCode: 400
		});
	}

	const salt = generateSalt();
	const passwordHash = await encodeAsync(password, salt);

	const tokens = generateTokens({ login: login , roles: roles });

	const user:User = {
		login: login,
		refreshToken: tokens.refreshToken,
		passwordHash: passwordHash,
		salt: salt,
		roles: roles,
	};

	const userModel = new UserModel(user);
	await userModel.save();

	return tokens;
}

function queryLoginFilter(options: LoginOptions & { login: string }) {

	const filter: FilterQuery<typeof UserModel> = { login: options.login };

	if(options?.withRolesOnly) {
		filter.rolesArrayLength = { 
			$gt: 0,
		};
	}

	return filter;
}
