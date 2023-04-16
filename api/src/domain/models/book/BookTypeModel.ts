import { Schema } from 'mongoose';
import { BookType } from '@/domain/types/book.types';

const bookTypeSchema = new Schema<BookType>({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	}
});

bookTypeSchema.index({ code: 1 } , { unique: true });

export default bookTypeSchema;