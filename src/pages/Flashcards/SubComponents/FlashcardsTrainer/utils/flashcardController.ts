import { Subject } from "rxjs"
import { changeCurrentFlashcard } from "../../../../../state/redux/features/Flashcard/flashcardSlice"
import { store } from "../../../../../state/redux/store"
import Queue from "./Queue"

const currentFlashcard = new Subject<string>()

const flashcardService = {
  changeFlashcard: (flashcardID: string) => currentFlashcard.next(flashcardID),
  getFlashcard: () => currentFlashcard.asObservable(),
}

export function nextQuestion(queue: any) {
  // When the wrong button or right button was clicked we want
  const isTraining = store.getState().flashcards.training.isTraining as boolean
  const _currentFlashcard = store.getState().flashcards.training
    .currentFlashcard as string | null
  // NOTE We have set the FlashcardsForTraining in advance in (FlashcardTrainer.tsx)
  const flashcardsForTraining = store.getState().flashcards.training
    .flashcardsForTraining as string[]
  console.log("store: ", store.getState())
  console.log("flashcards redux", flashcardsForTraining)

  // If we are revising then we want to set the currentFlashcard
  if (isTraining && !_currentFlashcard) {
    console.log("dqueued: ", queue.dequeue())
    store.dispatch(changeCurrentFlashcard(queue.dequeue()))
  }

  // If we are revising and have a currentFlashcard then we want to pass the next flashcard
  else if (isTraining && _currentFlashcard) {
    console.log("peek: ", queue.peek())
    const nextFlashcard = queue.dequeue()
    // If there are no more flashcards for revision
    if (!nextFlashcard) {
    } else {
      flashcardService.changeFlashcard(nextFlashcard)
    }
  }

  // If we are revising and there is no more currentFlashcard
  else {
    console.log("end")
  }

  /**
   * The id of the current flashcard
   */
  const currentID: string = ""
}

export default flashcardService
