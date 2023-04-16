import { Schema } from 'mongoose';
import { Role } from '@/domain/types/identity.types';

const roleSchema = new Schema<Role>({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	}
});

roleSchema.index({ code: 1 } , { unique: true });

export default roleSchema;