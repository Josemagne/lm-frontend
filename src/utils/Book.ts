import books from '../storage/indexedDB/books';
import { LM_Book } from '../types/Book/book';
import { nanoid } from 'nanoid';

/**
 * Class for book
 */
export default class Book {
    constructor() {

    }

    public static addBook = async (book: Omit<LM_Book, "book_id">): Promise<boolean> => {
        let result: boolean = false;

        // Create a unique id
        const book_id = nanoid();

        books.books.add(book);

        return result;

    }

    public static getBook = async (bookId: string): Promise<boolean> => {
        let result: boolean = false;

        return result;

    }

    public static updateBook = async (bookId: string, book: LM_Book): Promise<boolean> => {
        let result: boolean = false;

        return result;

    }

    public static removeBook = async (bookId: string): Promise<boolean> => {
        let result: boolean = false;

        return result;
    }

}