import { FlashcardStatus, LM_Flashcard } from '../../types/Flashcard/flashcard';
import { LM_EntityName } from "../../types/Entity/entity";
import { nanoid } from 'nanoid';

class Flashcard implements LM_Flashcard {
    flashcard_id: string = nanoid();
    flashcardStatus: FlashcardStatus = "NEW";
    question = "";
    answer = "";
    status: FlashcardStatus = "NEW";
    entity: {
        entityType: LM_EntityName,
        entityID: string
    };
    timesRepeated: number = 0;
    bookcollection_id: string | undefined;
    book_id: string | undefined;
    subchapter_id: string | undefined;
    chapter_id: string | undefined;
    articlecollection_id: string | undefined;
    article_id: string | undefined;

    constructor(flashcard_id: string, question: string, answer: string, entityType: LM_EntityName, entityID: string) {
        this.entity = { entityID, entityType }
        this.flashcard_id = flashcard_id;
        this.question = question
        this.answer = answer
    }

}

export default Flashcard;
