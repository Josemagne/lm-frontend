import LM_Chapter from '../types/Book/chapter';
import { nanoid } from 'nanoid';
import { LM_Flashcard } from '../types/Flashcard/flashcard';
import { LM_EntityStatus } from '../types/Entity/entity';

/**
 * A chapter in a book
 */
class Chapter implements LM_Chapter {

    book_id: string;
    title: string;
    chapter_id: string;
    status: LM_EntityStatus;
    importance: number;
    summary: string;
    flashcards: [] = [];
    commentary = ""
    started: Date | undefined;
    ended: Date | undefined;
    subchapters?: string[]
    index: string | undefined;
    degree?: number | null;
    parentChapter?: string | null;
    notes: string[] = []
    pictures: string[] = [];
    keyWords: string[] = [];
    loanWords: string[] = [];
    glossaryWords: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(
        chapter_id: string,
        book_id: string,
        title: string,
        status: LM_EntityStatus,
        importance: number,
        summary: string,
        index: string,
        subchapters?: string[],
        started?: Date | null,
        ended?: Date | null,
        degree?: number,
        parentChapter?: string
    ) {
        this.chapter_id = chapter_id;
        this.book_id = book_id;
        this.title = title
        this.status = status;
        this.importance = importance
        this.summary = summary
        this.subchapters = subchapters
        this.started = undefined;
        this.ended = undefined;
        this.index = index
        this.degree = degree
        this.parentChapter = parentChapter
    }


}

export default Chapter;