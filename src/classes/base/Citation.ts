import { LM_Citation } from "../../types/Book/citation";
import { nanoid } from 'nanoid';

export default class Citation implements LM_Citation {
    citation_id: string;
    book_id: string;
    citation: string;
    commentary: string;

    constructor(
        book_id: string,
        citation: string,
        commentary: string,
        citation_id: string,
    ) {
        if (citation_id) {
            this.citation_id = citation_id
        } else {
            this.citation_id = nanoid();
        }
        this.book_id = book_id
        this.citation = citation
        this.commentary = commentary
    }

}