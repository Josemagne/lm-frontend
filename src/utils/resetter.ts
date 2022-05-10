import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { changeSelectedBook } from '../state/redux/features/bookSlice';
import { changeSelectedChapter } from '../state/redux/features/chapterSlice';
import { changeSelectedFlashcard } from '../state/redux/features/Flashcard/flashcardSlice';
/**
 * Resets our state for selected entities such as Book, Chapter and Flashcard
 */
export default function resetter(dispatch: Dispatch<AnyAction>, where?: string) {
    const location = window.location.href

    if (where) {
        // If we click on a click that leads to the same page then we ignore it
        if (location.includes(where.substring(1))) return;
    }

    if (location.includes("booksviewer")) {
        dispatch(changeSelectedBook(null))
    }
    else if (location.includes("chaptersviewer")) {
        dispatch(changeSelectedChapter(null))
    }
    else if (location.includes("flashcards")) {
        dispatch(changeSelectedFlashcard(null))
    }

}