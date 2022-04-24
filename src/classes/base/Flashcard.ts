import { LM_Flashcard, FlashcardType } from '../../types/flashcards/flashcard';
import { nanoid } from 'nanoid';

class Flashcard implements LM_Flashcard {
    flashcard_id: string = nanoid();
    flashcardType: FlashcardType;
    bookcollection_id: string | undefined;
    book_id: string | undefined;
    chaptercollection_id: string | undefined;
    chapter_id: string | undefined;
    articlecollection_id: string | undefined;
    article_id: string | undefined;
    question: string = "";
    answer: string = "";

    constructor(flashcard_id: string, flashcardType: FlashcardType, question: string, answer: string, book_id?: string, chapter_id?: string, article_id?: string) {
        this.flashcard_id = flashcard_id;
        this.flashcardType = flashcardType;
        this.book_id = book_id;
        this.chapter_id = chapter_id;
        this.article_id = article_id;
        this.question = question
        this.answer = answer
    }

}

export default Flashcard;