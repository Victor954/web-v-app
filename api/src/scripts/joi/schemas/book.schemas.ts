import Joi from 'joi';
import { BookType } from '../../../domain/types/book.types';

export const bookTypeSchema = Joi.object<BookType>({
	name: Joi.string()
		.regex(/[А-я]/)
		.min(3)
		.max(125)
		.required(),

	code: Joi.string()
		.alphanum()
		.min(3)
		.max(125)
		.required(),
});
