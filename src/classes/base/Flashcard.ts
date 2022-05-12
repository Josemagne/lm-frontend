import { LM_Flashcard } from '../../types/Flashcard/flashcard';
import { LM_EntityName } from "../../types/Entity/entity";
import { nanoid } from 'nanoid';

class Flashcard implements LM_Flashcard {
    flashcard_id: string = nanoid();
    flashcardType: LM_EntityName;
    bookcollection_id: string | undefined;
    book_id: string | undefined;
    subchapter_id: string | undefined;
    chapter_id: string | undefined;
    articlecollection_id: string | undefined;
    article_id: string | undefined;
    question = "";
    answer = "";

    constructor(flashcard_id: string, flashcardType: LM_EntityName, question: string, answer: string, book_id?: string, chapter_id?: string, article_id?: string) {
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
