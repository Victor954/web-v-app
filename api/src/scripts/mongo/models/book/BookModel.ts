import { Schema , model } from 'mongoose';
import { Book } from '@/domain/types/book.types';

const BookSchema = new Schema<Book>({
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

const BookModel = model('Book' , BookSchema , 'lib.books');

export default BookModel;