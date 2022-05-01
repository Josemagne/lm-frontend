import Dexie from 'dexie';

class ChapterDB extends Dexie {
    chapter!: Dexie.Table;

    constructor() {
        super("librimem");
        this.version(1).stores({ "chapter": "chapter_id, book_id, title, toRead, status, importance, summary, flashcards, started, ended" })
    }
}

export default new ChapterDB().chapter;
