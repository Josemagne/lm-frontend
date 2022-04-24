import Dexie, { Table } from 'dexie';
import { LM_Book } from '../../../types/Book/book';
class BookDB extends Dexie {
    book!: Table<LM_Book>;

    constructor() {
        super("librimem")
        this.version(1).stores({
            "book": "book_id, author, status,book_title,pages, read, progress, chapters, summary, rate, flashcards, collections"
        })
    }
}

const book = new BookDB();

export default book.book;
