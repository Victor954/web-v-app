import { BookType } from '@/domain/types/book.types';
import { db } from '@/scripts/mongo';

export async function insertOneAsync(typeData: BookType) {
	const bookType = new db.BookTypeModel(typeData);
	const result = await bookType.save();

	return result;
}

export async function findAsync() {
	const result = await db.BookTypeModel.find();
	return result;
}

export async function findOneAsync(code: string) {
	const result = await db.BookTypeModel.findOne({ code });
	return result;
}

export async function updateAsync(code: string , typeData:  Partial<BookType>) {
	const result = await db.BookTypeModel.updateOne({ code } , typeData);
	return result;
}

export async function deleteAsync(code: string) {
	const result = await db.BookTypeModel.deleteOne({ code });
	return result;
}

export async function deleteManyAsync(codes: string[]) {
	const result = await db.BookTypeModel.deleteMany({ code: { $in: codes } });
	return result;
}