import { LM_Book } from "../types/Book/book";
import LM_Chapter from '../types/Book/chapter';
import { LM_EntityStatus } from "../types/Entity/entity";
import { LM_Flashcard } from "../types/Flashcard/flashcard";

export default class Book implements LM_Book {
    book_id: string;
    author_prename: string;
    author_name: string;
    status: LM_EntityStatus = "TO_READ"
    book_title: string;
    pages: number;
    read: boolean;
    progress: number;
    summary: string = "";
    genre = ""
    rate: number = 1;
    chapters: string[] = []
    flashcards: string[] = []
    bookCollection: string[] = [];
    commentary = "";
    keyWords = [];
    glossaryWords = [];
    loanWords: string[] = [];
    chapterCollection: string[] = []
    collections: string[] = []
    notes: string[] = [];
    commentaries: string[] = []


    constructor(
        book_id: string,
        author_prename: string,
        author_name: string,
        book_title: string,
        pages: number,
        read: boolean,
        progress: number,
        summary: string
    ) {
        this.book_id = book_id
        this.summary = summary;
        this.author_prename = author_prename
        this.author_name = author_name;
        this.book_title = book_title
        this.pages = pages
        this.read = read
        this.progress = progress
    }


}