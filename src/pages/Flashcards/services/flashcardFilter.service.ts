import { BehaviorSubject, Subject, from, map } from "rxjs"
import { LM_Flashcard } from "../../../types/Flashcard/flashcard"
import { AppDispatch } from "../../../state/redux/store"

const filteredFlashcards = new Subject<LM_Flashcard[]>()

// NOTE Here we define the pipe
// The pipe is where we transform the data from the view (UI)
filteredFlashcards.pipe(
  //
  map((f) => {})
)

export const flashcardServices = {
  filterFlashcards: (flashcards: LM_Flashcard[]) =>
    filteredFlashcards.next(flashcards),
  getFilteredFlashcards: () => filteredFlashcards.subscribe(),
}
