import { Schema } from 'mongoose';
import { BookCategory } from '@/domain/types/book.types';

const bookCategorySchema = new Schema<BookCategory>({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	}
});

bookCategorySchema.index({ code: 1 } , { unique: true });

export default bookCategorySchema;