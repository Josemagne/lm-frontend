import { LM_Book } from "../types/Book/book";
import { Descendant } from 'slate';
import LM_Chapter from '../types/Book/chapter';

export default class Book implements LM_Book {
    book_id: string;
    author: string;

    book_title: string;
    isPercentage: boolean;
    contents: Descendant[];
    pages: number;
    read: boolean;
    progress: number;
    chapters: {
        [id: string]: LM_Chapter
    },
    chaptersIndexing: { [index: string]: string; };
    summary: string;
    rate: number;



    constructor(
        book_id: string,
        author: string,
        book_title: string,
        isPercentage: boolean,
        contents: Descendant[],
        pages: number,
        read: boolean,
        progress: number,
    ) {
        this.book_id = book_id
        this.author = author
        this.book_title = book_title
        this.isPercentage = isPercentage
        this.contents = contents
        this.pages = pages
        this.read = read
        this.progress = progress
        this.summary = summary
        this.rate = rate
    }

    private generateChaptersIndexing() {
        // Get the chapters
        const chapters = this.chapters;

    }

}