import Dexie, { Table } from "dexie"
import { LM_BookFlashcard } from "../../types/Book/bookflashcard"

class BookFlashcardDB extends Dexie {
    BookFlashcard!: Table<LM_BookFlashcard>

    constructor() {
        super("LibriMem")
        this.version(1).stores({
            "bookflashcard": "bookflashcard_id, book_id, flashcard"
        })
    }
}

export default new BookFlashcardDB().BookFlashcard;