import { LM_BookFlashcard } from "../types/Book/bookflashcard";
import { LM_Flashcard } from "../types/flashcards/flashcard";
import { nanoid } from 'nanoid';

export default class BookFlashcard implements LM_BookFlashcard {
    flashcard_id: string;
    book_id: string;
    flashcard: LM_Flashcard;


    constructor(book_id: string, flashcard: LM_Flashcard, flashcard_id: string) {
        if (flashcard_id) {
            this.flashcard_id = flashcard_id
        } else {
            this.flashcard_id = nanoid();
        }

        this.book_id = book_id
        this.flashcard = flashcard
    }

}