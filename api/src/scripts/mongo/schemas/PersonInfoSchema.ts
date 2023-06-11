import { Schema } from 'mongoose';

import { PersonInfoModelDTO } from '@/domain/types/models/user.types';

const PersonInfoSchema = new Schema<PersonInfoModelDTO>({
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