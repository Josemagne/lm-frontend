import books from './books';
import { LM_Book } from '../../types/Book/book';
import { nanoid } from 'nanoid';
import { useLiveQuery } from 'dexie-react-hooks';
import LM_Chapter from '../../types/Book/chapter';
import { Descendant } from 'slate';

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

        await books.books.get(bookId).then((res) => {
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

        result = await books.books.toArray();

        return result;
    }

    /**
     * Updates the book in indexedDB
     * @param bookId 
     * @param book 
     * @returns 
     */
    public static updateBook = async (bookId: string, book: LM_Book): Promise<boolean> => {
        let result: boolean = false;

        books.books.update(bookId, book);

        return result;
    }

    public static removeBook = async (bookId: string): Promise<boolean> => {
        let result: boolean = false;

        await books.books.delete(bookId).then(() => {
            result = true;
        })

        return result;
    }

    // TODO Move to Chapter.ts
    // ANCHOR Chapter
    /**
     * Adds chapter to indexedDB
     */
    public static addChapter = async (bookID: string, chapter: LM_Chapter): Promise<any> => {
        console.log("STARTING  Book.addChapter()")

        // Get book
        const book = await books.books.get(bookID).then((book) => book)

        console.log("got bokk from indexedDB: ", book)

        if (!book) return;

        // Push the new chapter in the book
        book.chapters.push(chapter);

        console.log("Calling Book.updateBook()")
        // Update the book
        await this.updateBook(book.book_id, book)

        console.log("Inserted new chapter to book in indexedDB")

        return bookID;
    }

    public static getChapters = async (book_id: string): Promise<LM_Chapter[] | null> => {
        let result: null | LM_Chapter[] = null;
        await books.books.get(book_id).then((book) => {
            if (book)
                result = book?.chapters;
        })
        return result;
    }

    public static removeChapter = async (chapter_id: string, book_id: string): Promise<any> => {
        const book = await this.getBook(book_id)
        /**
         * Index of the chapter in book.chapters[] that we are going to delete
         */
        let index = 0;
        if (!book) return;
        book.chapters.find((ch, i) => {
            if (ch.chapter_id === chapter_id) index = i;
        })
        book.chapters.slice(index, 1);

        // Update book
        this.updateBook(book.book_id, book);
    }

    // ANCHOR summary
    public static changeSummary = async (bookId: string, chapterId: string, summary: Descendant[]): Promise<any> => {
        // Get book
        const book = await books.books.get(bookId);

        if (!book) return;

        book.chapters.find((chapter) => {
            if (chapter.chapter_id === chapterId) {
                // Replace Summary
                chapter.summary = summary;
            }
        })

        // Update book
        this.updateBook(bookId, book);
    }

}