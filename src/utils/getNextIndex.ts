import { LM_Book } from '../types/Book/book';
import LM_Chapter from '../types/Book/chapter';

/**
 * Ascertains if the given index is a subindex
 * @param index 
 */
function IsSubIndex(index: string): boolean {
    if (index.includes(".")) return true;
    return false;
}

/**
 * Increments a subindex
 * @example "1.1.3" returns "1.1.4"
 * @param index 
 */

// function IncrementSubIndex(index: string): string {

// }

/**
 * Gets the next index for a book 
 */
export default function getNextIndex(book: LM_Book): string {

    // Get the chapters
    const chapters = book.chapters;

    if (chapters.length === 0) return "1";

    let index = chapters[chapters.length - 1].index;


    if (!IsSubIndex(index)) return (Number(index) + 1).toString();

    let firstNumber = Number(index[0]);

    firstNumber++;

    const nextIndex = firstNumber.toString() + index.slice(1);

    return nextIndex;

}