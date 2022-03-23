import LM_Summary from './summary';
import { Descendant } from 'slate';
export default interface LM_Chapter {
    chapter_id: string;
    /**
     * The title of the chapter
     */
    title: string;
    /**
     * Decides if the chapter should be read
     */
    toRead: boolean;
    /**
     * Importance is a number from 1 to 100 where 1 indicate that it is not important and 100 that it is of outmost importance
     */
    importance: number;
    /**
     * Indicates if the chapter is read.
     */
    read: boolean;
    summary: string;
    subchapters: LM_Subchapter[];
}

export interface LM_Subchapter extends LM_Chapter {
    isSubchapter: boolean;
}