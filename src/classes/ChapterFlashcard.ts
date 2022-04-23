import { LM_ChapterFlashcard } from "../types/Chapter/chapterflashcard";
import { LM_Flashcard } from "../types/flashcards/flashcard";
import { nanoid } from 'nanoid';

export default class ChapterFlashcard implements LM_ChapterFlashcard {

    flashcard_id: string;
    book_id: string;
    chapter_id: string;
    flashcard: LM_Flashcard;


    constructor(
        book_id: string,
        chapter_id: string,
        flashcard: LM_Flashcard,
        flashcard_id?: string,
    ) {
        if (flashcard_id) {
            this.flashcard_id = flashcard_id
        } else {
            this.flashcard_id = nanoid();
        }
        this.book_id = book_id
        this.chapter_id = chapter_id
        this.flashcard = flashcard
    }


}