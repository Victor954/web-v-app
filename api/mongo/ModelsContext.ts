import { BookType , Book , BookCategory} from "@/domain/types/book.types";
import mongoose from "mongoose";

import bookTypeSchema from "./models/book/BookTypeModel";
import bookCategorySchema from "./models/book/BookCategoryModel";
import bookSchema from "./models/book/BookModel";

import roleSchema from "./models/identity/RoleModel";
import userSchema from "./models/identity/UserModel";
import { Role, User } from "@/domain/types/identity.types";

class ModelsContext {

    BookTypeModel!: mongoose.Model<BookType>;
    BookCategoryModel!: mongoose.Model<BookCategory>;
    BookModel!: mongoose.Model<Book>;

    UserModel!: mongoose.Model<User>;
    RoleModel!: mongoose.Model<Role>;

    constructor() {
        this.BookModel = mongoose.model('Book' , bookSchema , 'lib.books');
        this.BookCategoryModel = mongoose.model('BookCategory' , bookCategorySchema , 'lib.book_categories');
        this.BookTypeModel = mongoose.model('BookType' , bookTypeSchema , 'lib.book_types');

        this.UserModel = mongoose.model('User' , userSchema , 'identity.users');
        this.RoleModel = mongoose.model('Role' , roleSchema , 'identity.roles');
    }
}

export default ModelsContext;