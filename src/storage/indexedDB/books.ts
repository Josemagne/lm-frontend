import Dexie, { Table } from "dexie"
import { LM_Book } from "../../types/Book/book";

class BooksDB extends Dexie {
    books!: Table<LM_Book>

    constructor() {
        super("LibriMem");
        this.version(1).stores({
            "books": "book_id, author_name, auhor_prename, book_title, pages, read, progress, chapters, summary"
        })
    }

}


/**
 * Database for the books
 */
const books = new BooksDB();

export default books;