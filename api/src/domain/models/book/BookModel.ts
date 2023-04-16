import { Schema } from 'mongoose';
import { Book } from '@/domain/types/book.types';

const bookSchema = new Schema<Book>({
	name: {
		type: String,
		required: true,
	},
	dateWrite: {
		type: Date,
		required: true,
	},
	types: {
		type: [String],
		required: true,
	}
});

export default bookSchema;