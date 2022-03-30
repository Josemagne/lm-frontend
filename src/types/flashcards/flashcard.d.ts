import { Descendant } from 'slate';
export declare interface LM_Flashcard {
    flashcard_id: string;
    /**
     * HTML string with question
     */
    question: Descendant[];
    /**
     * HTML string with answer
     */
    answer: Descendant[];

}