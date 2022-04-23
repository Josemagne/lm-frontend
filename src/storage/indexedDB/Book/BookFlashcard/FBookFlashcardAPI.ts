import { LM_BookFlashcard } from "../../../../types/Book/bookflashcard";
import BookFlashcardDB from "./BookFlashcardDB";

export default class FBookFlashcardAPI {
    public static addBookFlashcard = async (newBookFlashcard: LM_BookFlashcard) => {
        return await BookFlashcardDB.add(newBookFlashcard, newBookFlashcard.flashcard_id)
    }

    public static getBookFlashcard = async (bookFlashcardID: string) => {
        return await BookFlashcardDB.get(bookFlashcardID)
    }

    /**
     * Get all the BookFlashcard objects
     * @returns 
     */
    public static getBookFlashcards = async () => {
        return await BookFlashcardDB.toArray();
    }

    /**
     * Updates a BookFlashcard
     * @param updatedBookFlashcard 
     * @returns 
     */
    public static updateBookFlashcard = async (updatedBookFlashcard: LM_BookFlashcard) => {
        return await BookFlashcardDB.update(updatedBookFlashcard.flashcard_id, updatedBookFlashcard);
    }


    /**
     * Deletes BookFlaschard
     * @param bookFlashcardID 
     * @returns 
     */
    public static deleteBookFlashcard = async (bookFlashcardID: string) => {
        return await BookFlashcardDB.delete(bookFlashcardID);
    }

}