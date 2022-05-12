import React from "react"
import { useEffect } from "react"
import useAppSelector from "../../../../../../hooks/useAppSelector"
import LM_Flashcard from "../../../../../../types/Flashcard/flashcard"
import useAppDispatch from "../../../../../../hooks/useAppDispatch"
import FlashcardAdder from "../../../../../../components/FlashcardAdder/FlashcardAdder"
import { switchAddingNewFlashcardStatus } from "../../../../../../state/redux/features/Flashcard/flashcardSlice"

type Props = {}

/**
 * Handles the flashcards in the Modal
 * @param props
 * @returns
 */
const ChapterFlashcards = (props: Props) => {
  const dispatch = useAppDispatch()
  function toggleAddingNewFlashcard() {
    dispatch(switchAddingNewFlashcardStatus(""))
  }
  return (
    <div className="lm-chaptermodifier__flashcards mt-3">
      <div className="container">
        <h3>Flashcards</h3>
        <button onClick={toggleAddingNewFlashcard} className="btn btn-info">
          Add a flashcard
        </button>
        <FlashcardAdder type={"CHAPTER"} />
      </div>

      <div className="lm-chaptermodifier__flashcards__question"></div>
      <div className="lm-chaptermodifier__flashcards__answer"></div>
    </div>
  )
}

export default ChapterFlashcards
