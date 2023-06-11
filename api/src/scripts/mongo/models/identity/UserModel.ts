import { Schema , model } from 'mongoose';
import { UserModelDTO } from '@/domain/types/models/user.types';
import PersonInfoSchema from '../../schemas/PersonInfoSchema';

const UserSchema = new Schema<UserModelDTO>({
	login: {
		type: String,
		required: true,
	},
	personInfo: {
		type: PersonInfoSchema,
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

UserSchema.pre('insertMany' , function (next , docs: UserModelDTO[]) {
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