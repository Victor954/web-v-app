import { Schema , model} from 'mongoose';
import { BookType } from '@/domain/types/book.types';

const BookTypeSchema = new Schema<BookType>({
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

BookTypeSchema.index({ code: 1 } , { unique: true });

const BookTypeModel = model('BookType' , BookTypeSchema , 'lib.book_types');

export default BookTypeModel;