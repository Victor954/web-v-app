import { Schema } from 'mongoose';
import { PersonInfo } from '@/domain/types/identity.types';

const PersonInfoSchema = new Schema<PersonInfo>({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	patronymic: {
		type: String,
		default: null
	}
} , { _id: false });

export default PersonInfoSchema;