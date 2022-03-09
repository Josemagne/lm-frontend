import books from '../storage/indexedDB/books';
import { LM_Book } from '../types/Book/book';
import { nanoid } from 'nanoid';
import { useLiveQuery } from 'dexie-react-hooks';
import LM_Chapter from '../types/Book/chapter';

/**
 * Class for book
 */
export default class Book {
    constructor() {

    }

    /**
     * Adds book to indexedDB
     * @param book Book object
     * @returns Promise<boolean>
     */
    public static addBook = async (book: any): Promise<boolean> => {
        let result: boolean = false;

        // Create a unique id
        book.book_id = nanoid();

        // Add it to indexedDB
        books.books.add(book).then((res) => {
            // If the result was successful
            if (res) result = true;
        })

        return result;

    }

    /**
     * Gets a specific book from indexedDB
     * @param bookId book_id from book
     * @returns LM_Book object
     */
    public static getBook = async (bookId: string): Promise<LM_Book | undefined> => {
        let result: LM_Book | undefined;

        books.books.get(bookId).then((res) => {
            result = res;
        });

        return result;
    }

    /**
     * 
     * @returns All the books from indexedDB
     */
    public static getBooks = async (): Promise<LM_Book[] | undefined> => {
        let result: LM_Book[] | undefined;

        result = useLiveQuery(() => books.books.toArray());

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

    // TODO Move to Chapter.ts
    // ANCHOR Chapter
    /**
     * Adds chapter to indexedDB
     */
    public static addChapter = async (book: LM_Book, chapter: LM_Chapter) => {
        // Add chapter to book
        book.chapters?.push(chapter);
        books.books.put(book, book.book_id);
    }


}