import Dexie, { Table } from 'dexie';
import { LM_Book } from '../../../types/Book/book';
import { LM_Flashcard } from '../../../types/Flashcard/flashcard';

class FlashcardDB extends Dexie {
    flashcard!: Table<LM_Flashcard>;

    constructor() {
        super("librimem")
        this.version(1).stores({
            "flashcard": "flashcard_id, flashcardType, question, answer ,bookcollection_id, book_id, chaptercollection_id, chapter_id, articlecollection_id, article_id"
        })
    }
}

const flashcard = new FlashcardDB();

export default flashcard.flashcard;
