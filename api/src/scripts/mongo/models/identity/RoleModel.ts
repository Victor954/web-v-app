import { Schema , model } from 'mongoose';
import { Role } from '@/domain/types/identity.types';

const RoleSchema = new Schema<Role>({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	}
});

RoleSchema.index({ code: 1 } , { unique: true });

const RoleModel = model('Role' , RoleSchema , 'identity.roles');

export default RoleModel;