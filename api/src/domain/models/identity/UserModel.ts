import { Schema } from 'mongoose';
import { User } from '@/domain/types/identity.types';

const userSchema = new Schema<User>({
	login: {
		type: String,
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	roles: {
		type: [String],
		default: []
	}
});

export default userSchema;