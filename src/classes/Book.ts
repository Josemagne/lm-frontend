import { LM_Book } from "../types/Book/book";
import LM_Chapter from '../types/Book/chapter';
import { LM_EntityStatus } from "../types/Entity/entity";
import { LM_Flashcard } from "../types/Flashcard/flashcard";

export default class Book implements LM_Book {
    book_id: string;
    author_id: string;
    author_prename: string;
    author_name: string | undefined;
    status: LM_EntityStatus = "TO_READ"
    book_title: string;
    pages: number;
    progress: number;
    summary = "";
    genre = ""
    rate = 1;
    commentary = "";

    constructor(
        book_id: string,
        author_id: string,
        author_prename: string,
        book_title: string,
        pages: number,
        progress: number,
        summary: string,
        author_name?: string,
    ) {
        this.book_id = book_id
        this.author_id = author_id;
        this.summary = summary;
        this.author_prename = author_prename
        this.author_name = author_name;
        this.book_title = book_title
        this.pages = pages
        this.progress = progress
        this.status = "TO_READ"
        this.summary = "";
        this.genre = ""
        this.rate = 1;
        this.commentary = "";
    }


}
