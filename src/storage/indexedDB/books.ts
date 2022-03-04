import Dexie, { Table } from "dexie"
import { LM_Book } from "../../types/Book/book";
/**
 * Database for the books
 */
class BooksDB extends Dexie {
    books!: Table<LM_Book>

    constructor() {
        super("myDatabase");
        this.version(1).stores({
            "books": "book_id, author_name, auhor_prename, book_title"
        })
    }

}


const books = new BooksDB();

export default books;