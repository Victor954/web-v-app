import { Schema , model } from 'mongoose';
import { RoleModelDTO } from '@/domain/types/models/roles.types';

const RoleSchema = new Schema<RoleModelDTO>({
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