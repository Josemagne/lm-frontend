import { LM_Note } from "../types/Note/note";
import { nanoid } from 'nanoid';

export default class Note implements LM_Note {
    note_id: string = nanoid();
    title: string;
    note: string = "";
    book_id: string;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();


    constructor(title: string, note: string, book_id: string) {
        this.title = title;
        this.book_id = book_id;
        this.note = note;
    }
}