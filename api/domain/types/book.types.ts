export type Book = {
    name: string,
    dateWrite: Date,
    types: string[]
}

export type BookType = {
    name: string;
    code: string;
    category: string;
}

export type BookCategory = {
    name: string;
    code: string;
}