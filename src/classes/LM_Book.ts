import { LM_Book } from "../types/Book/book"
import { nanoid } from 'nanoid';

export default class Book implements LM_Book {
    book_id: string;
    author: string;
    constructor(author: string) {
        this.book_id = nanoid();
        this.author = author;
    }
}