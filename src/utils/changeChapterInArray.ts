import { LM_Book } from '../types/Book/book';
import LM_Chapter from '../types/Book/chapter';

/**
 * Changes in the chapter in an array
 * @param arr 
 * @param oldChID 
 * @param newChapter 
 */
export default function changeChapterInArray(arr: LM_Chapter[], oldChID: string, newChapter: LM_Chapter): LM_Chapter[] {

    /**
     * Index of the chapter to remove
     */
    let index: number = 0;

    arr.find((ch, i) => {
        index = i;
        return ch.chapter_id === newChapter.chapter_id;
    })

    arr.slice(index, 1);

    arr.push(newChapter)

    return arr;

}