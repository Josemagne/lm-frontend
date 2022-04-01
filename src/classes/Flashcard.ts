import { Descendant } from 'slate';
import { LM_Flashcard } from "../types/flashcards/flashcard";
import { nanoid } from 'nanoid';

class Flashcard implements LM_Flashcard {
    flashcard_id: string = nanoid();
    question: Descendant[] = [{ children: [{ text: "" }] }];
    answer: Descendant[] = [{ children: [{ text: "" }] }]


    constructor(flashcard_id?: string, question?: Descendant[], answer?: Descendant[]) {
        if (flashcard_id) {
            this.flashcard_id = flashcard_id;
        }
        if (question) {
            this.question = question
        }
        if (answer) {
            this.answer = answer
        }
    }

}

export default Flashcard;