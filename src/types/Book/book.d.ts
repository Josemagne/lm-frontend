import type LM_Chapter from "./chapter";
import { LM_Book_Contents } from "./contents";

export declare interface LM_Book {
    /**
     * Unique id that identifies the book
     */
    book_id: string;
    /**
     * Full name of the author
     */
    author: string;
    book_title: string;
    /**
     * Decides if we use percentage instead of pages
     */
    isPercentage: boolean;
    /**
     * Number of pages
     */
    contents: LM_Book_Contents;
    pages: number;
    /**
     * Decides if the book is finished
     */
    read: boolean;
    /**
     * A number between 1 and 100 that indicates how far we have gotten with the book.
     */
    progress: number;
    chapters: {
        [id: string]: LM_Chapter;
    };
    summary: string;
    /**
     * Number between 1 and 5 for stars.
     */
    rate: number;
}
