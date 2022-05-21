import { of, BehaviorSubject, filter, from, map, Observable } from "rxjs"
import { LM_Flashcard } from "../../../../../types/Flashcard/flashcard"

/**
 * Returns the indexes of all the flashcards that should be revised
 * @param flashcards
 */
export default function getFlashcardsForTraining(
  flashcards: LM_Flashcard[]
): Observable<string[]> {
  // A BehaviorSubject is an Observable that always has a value, and you can call myBehaviorSubject.getValue() or myBehaviorSubject.value to synchronously retrieve the value the BehaviorSubject currently holds.
  const flashcard$ = new BehaviorSubject<LM_Flashcard[]>(flashcards)
  // const stream = new BehaviorSubject(source);

  const flashcardsForTraining = flashcard$.pipe(
    map((flashcard$) =>
      flashcard$.filter((f) => f.status === "NEW" || f.status === "LEARNING")
    ),
    map((flashcard$) =>
      flashcard$.map((f) => {
        return f.flashcard_id
      })
    )
  )

  return flashcardsForTraining
}
