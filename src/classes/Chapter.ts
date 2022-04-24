import LM_Chapter from '../types/Book/chapter';
import { nanoid } from 'nanoid';
import { LM_Flashcard } from '../types/flashcards/flashcard';
import { ScriptureStatus } from '../types/common/scripturestatus';

/**
 * A chapter in a book
 */
class Chapter implements LM_Chapter {

    book_id: string;
    title: string;
    chapter_id: string;
    toRead: boolean;
    read: boolean = false;
    status: ScriptureStatus;
    importance: number;
    summary: string;
    flashcards: {};
    started: Date | null;
    ended: Date | null;
    subchapters?: string[]
    index: string;
    degree?: number | null;
    parentChapter?: string | null;


    constructor(
        chapter_id: string,
        book_id: string,
        title: string,
        toRead: boolean,
        read: boolean,
        status: ScriptureStatus,
        importance: number,
        summary: string,
        index: string,
        subchapters?: string[],
        started?: Date | null,
        ended?: Date | null,
        degree?: number,
        parentChapter?: string
    ) {
        this.chapter_id = nanoid();
        this.book_id = book_id;
        this.title = title
        this.flashcards = {};
        this.status = status;
        this.toRead = toRead
        this.importance = importance
        this.read = read
        this.summary = summary
        this.subchapters = subchapters
        this.started = null
        this.ended = null
        this.index = index
        this.degree = degree
        this.parentChapter = parentChapter
    }






}

export default Chapter;