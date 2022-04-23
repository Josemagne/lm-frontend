import { LM_Citation } from "../../types/Book/citation";
import { LM_ChapterCitation } from "../../types/Chapter/chaptercitation";
import { nanoid } from 'nanoid';
import Citation from "../base/Citation";

export default class ChapterCitation extends Citation implements LM_ChapterCitation {
    book_id!: string;
    citation_id!: string;
    citation!: string;
    commentary!: string;
    chapter_id: string;


    constructor(
        book_id: string,
        chapter_id: string,
        citation: string,
        commentary: string,
        citation_id?: string,
    ) {
        if (!citation_id) {
            citation_id = nanoid();
        }
        super(book_id, citation_id, commentary, citation);
        this.chapter_id = chapter_id
    }



}