import { LM_Book } from "../types/Book/book"
import { nanoid } from 'nanoid';
import LM_Chapter from '../types/Book/chapter';

export default class Book implements LM_Book {
    book_id: string;
    author: string;
    book_title: string;
    pages: number;
    progress: number;
    rate: number;
    read: boolean;
    summary: string;
    chapters: LM_Chapter[];
    constructor(author: string, book_title: string, pages: number, rate: number, read: boolean, summary: string, progress: number, chapters?: LM_Chapter[]) {
        this.book_id = nanoid();
        this.author = author;
        this.book_title = book_title;
        this.pages = pages;
        this.rate = rate;
        this.read = read;
        this.summary = summary;
        this.progress = progress;
        this.chapters = chapters || [];
    }
}