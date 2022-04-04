import LM_Chapter from '../types/Book/chapter';
import { Descendant } from 'slate';
import { nanoid } from 'nanoid';
import { LM_Flashcard } from '../types/flashcards/flashcard';

/**
 * A chapter in a book
 */
class Chapter implements LM_Chapter {

    book_id: string;
    title: string;
    chapter_id: string;
    toRead: boolean;
    read: boolean = false;
    importance: number;
    summary: string;
    flashcards: {};
    started: Date | null;
    ended: Date | null;
    isSubchapter: boolean;
    subchapters?: string[]
    index?: string;
    degree?: number | null;
    parentChapter?: string | null;


    constructor(
        chapter_id: string,
        book_id: string,
        title: string,
        toRead: boolean,
        isSubchapter: boolean,
        read: boolean,
        importance: number,
        summary: string,
        subchapters?: string[],
        started?: Date | null,
        ended?: Date | null,
        index?: string,
        degree?: number,
        parentChapter?: string
    ) {
        this.chapter_id = nanoid();
        this.book_id = book_id;
        this.title = title
        this.flashcards = {};
        this.toRead = toRead
        this.importance = importance
        this.read = read
        this.summary = summary
        this.subchapters = subchapters
        this.started = null
        this.ended = null
        this.isSubchapter = isSubchapter
        this.index = index
        this.degree = degree
        this.parentChapter = parentChapter
    }






}

export default Chapter;