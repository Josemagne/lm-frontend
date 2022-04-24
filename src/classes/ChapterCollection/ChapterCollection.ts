import { LM_ChapterCollection } from "../../types/ChapterCollection/chaptercollection"
import { nanoid } from 'nanoid';
import { ScriptureStatus } from '../../types/common/scripturestatus';

export default class ChapterCollection implements LM_ChapterCollection {
    chaptercollection_id: string;
    book_id: string | undefined;
    article_id: string | undefined;
    status: ScriptureStatus;
    chapters: string[] = []

    constructor(book_id: string, chapters: string[], status: ScriptureStatus) {
        this.chaptercollection_id = nanoid();
        this.status = status;
        this.book_id = book_id;
        this.chapters = chapters;
    }
}