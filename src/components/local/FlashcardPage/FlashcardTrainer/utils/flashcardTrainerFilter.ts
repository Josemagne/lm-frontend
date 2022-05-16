import { from } from "rxjs"
import { map } from "rxjs/operators"
import { LM_Flashcard } from "../../../../../types/Flashcard/flashcard";

/**
 * Filteres the flashcards for the training
 */
function flashcardTrainerFilter(flashcards: LM_Flashcard[], flashcardsForTraining: string[]): LM_Flashcard[] {
    /**
     * Array with the filtered flashcarads
     */
    let filteredFlashcards: LM_Flashcard[] = [];

    const flashcard$ = from(flashcards);
    flashcard$.pipe(
        // Get the right flashcards
        map(f => f.status === "LEARNING" || f.status === "NEW")
    )
    flashcard$.subscribe(console.log)

    return filteredFlashcards;
}

export default flashcardTrainerFilter;