import React, { useEffect, useState } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import { RootState } from "../../../../../../state/redux/store"
import { LM_Flashcard } from "../../../../../../types/Flashcard/flashcard"
import { Subject, throttle } from "rxjs"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import {
  toggleFilteringState,
  updateFilteredFlashcards,
} from "../../../../../../state/redux/features/Flashcard/flashcardSlice"

type Props = {}

const FlashcardsSearch = (props: Props) => {
  const dispatch = useAppDispatch()
  const [isFiltering, setIsFiltering] = useState<boolean>()
  const flashcards: LM_Flashcard[] = Object.values(
    useAppSelector((state: RootState) => state.flashcards.flashcards.flashcards)
  )

  /**
   * Updates the filteredFlashcards
   * @param searchString
   */
  function searchFlashcards(searchString: string) {
    if (!isFiltering) dispatch(toggleFilteringState(true))

    const filteredFlashcards = flashcards.filter((flashcard) => {
      if (flashcard.answer.includes(searchString)) return flashcard
      if (flashcard.question.includes(searchString)) return flashcard
      return
    })

    dispatch(updateFilteredFlashcards(filteredFlashcards))
  }

  useEffect(() => {
    if (!flashcards) return
  }, [flashcards])

  return (
    <div className="lm-lc-flashcardssearch">
      <input
        type="text"
        onChange={(e) => searchFlashcards(e.currentTarget.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </div>
  )
}

export default FlashcardsSearch
