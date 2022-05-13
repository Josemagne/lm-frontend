import { from } from "rxjs"
import { map } from "rxjs/operators"
import { LM_Flashcard } from "../../../../../types/Flashcard/flashcard";

/**
 * Filteres the flashcards for the training
 */
function flashcardTrainerFilter(flashcards: LM_Flashcard[], flashcardsForTraining: string[]): LM_Flashcard[] {
    const flashcards$ = from(flashcards);
    flashcards$.pipe(
        // Get the right flashcards
        map(f => f.flashcardStatus === "LEARNING" || f.flashcardStatus === "NEW")
    )
    flashcards$.subscribe(console.log)
}

export default flashcardTrainerFilter;