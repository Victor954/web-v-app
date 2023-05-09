import { Schema ,model } from 'mongoose';
import { BookCategory } from '@/domain/types/book.types';

const BookCategorySchema = new Schema<BookCategory>({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	}
});

BookCategorySchema.index({ code: 1 } , { unique: true });

const BookCategoryModel = model('BookCategory' , BookCategorySchema , 'lib.book_categories');

export default BookCategoryModel;