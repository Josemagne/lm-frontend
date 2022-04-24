import { LM_Book } from "../types/Book/book";
import LM_Chapter from '../types/Book/chapter';
import { LM_Flashcard } from "../types/flashcards/flashcard";
import { ScriptureStatus } from '../types/common/scripturestatus';

export default class Book implements LM_Book {
    book_id: string;
    author: string;
    status: ScriptureStatus;
    book_title: string;
    pages: number;
    read: boolean;
    progress: number;
    summary: string = "";
    rate: number = 1;
    chapters: string[] = []
    flashcards: string[] = []
    chapterCollection: string[] = []
    collections: string[] = []
    notes: string[] = [];
    commentaries: string[] = []


    constructor(
        book_id: string,
        author: string,
        book_title: string,
        pages: number,
        read: boolean,
        progress: number,
        status: ScriptureStatus,
        summary: string
    ) {
        this.book_id = book_id
        this.status = status;
        this.summary = summary;
        this.author = author
        this.book_title = book_title
        this.pages = pages
        this.read = read
        this.progress = progress
    }


}