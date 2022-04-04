import LM_Summary from './summary';
import { Descendant } from 'slate';
import { LM_Flashcard } from '../flashcards/flashcard';
export default interface LM_Chapter {
    chapter_id: string;
    /**
     * The title of the chapter
     */
    title: string;
    /**
     * book_id of the book
     */
    book_id: string;
    /**
     * Decides if the chapter should be read
     */
    toRead: boolean;
    /**
     * Decides if the chapter has been read
     */
    read: boolean;
    /**
     * Importance is a number from 1 to 100 where 1 indicate that it is not important and 100 that it is of outmost importance
     */
    importance: number;
    /**
     * Indicates if the chapter is read.
     */
    read: boolean;
    summary: string;
    /**
     * chapter_ids of the subchapters
     */
    started: Date | null;
    ended: Date | null;
    flashcards: {
        [id: string]: LM_Flashcard;
    }
    /**
     * Decides if the chapter is a subchapter
     */
    isSubchapter: boolean;
    subchapters?: string[];
    /**
     * The index of the chapter
     * E.g. 1.1.1
     */
    index?: string;
    /**
     * The degree of the chapter
     * E.g. 1 --> x.1
     * E.g. 2 --> x.1.1
     */
    degree?: number | null;
    /**
     * ID of the parent chapter
     */
    parentChapter?: string | null;

}

export interface LM_Subchapter extends LM_Chapter {
    isSubchapter: boolean;
}