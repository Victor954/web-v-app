import { Schema , model } from 'mongoose';
import { User } from '@/domain/types/identity.types';

const UserSchema = new Schema<User>({
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
	},
	rolesArrayLength: {
		type: Number,
		default: 0
	}
});

UserSchema.index({ login: 1 } , { unique: true });

UserSchema.pre('save' , function (next) {
	try {
		this.rolesArrayLength =  this.roles?.length || 0;
		next();
	}
	catch(err) {
		next(err as Error);
	}
});

UserSchema.pre('insertMany' , function (next , docs: User[]) {
	try {
		docs.forEach(doc => {
			doc.rolesArrayLength = doc.roles?.length || 0;
		});

		next();
	} catch(err) {
		next(err as Error);
	}

});


const UserModel = model('User' , UserSchema , 'identity.users');


export default UserModel;