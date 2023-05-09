import { BookType } from '@/domain/types/book.types';
import BookTypeModel from '@/scripts/mongo/models/book/BookTypeModel';

export async function insertOneAsync(typeData: BookType) {
	const bookType = new BookTypeModel(typeData);
	const result = await bookType.save();

	return result;
}

export async function findAsync() {
	const result = await BookTypeModel.find();
	return result;
}

export async function findOneAsync(code: string) {
	const result = await BookTypeModel.findOne({ code });
	return result;
}

export async function updateAsync(code: string , typeData:  Partial<BookType>) {
	const result = await BookTypeModel.updateOne({ code } , typeData);
	return result;
}

export async function deleteAsync(code: string) {
	const result = await BookTypeModel.deleteOne({ code });
	return result;
}

export async function deleteManyAsync(codes: string[]) {
	const result = await BookTypeModel.deleteMany({ code: { $in: codes } });
	return result;
}