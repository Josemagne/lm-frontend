import React, { useEffect } from "react"
import useAppSelector from "../../../../hooks/useAppSelector"

type Props = {}

const FlashcardsTrainer = (props: Props) => {
  const flashcards = useAppSelector(
    (state) => state.flashcards.flashcards.flashcards
  )

  function startFlashcardTraining() {}

  useEffect(() => {}, [])

  return (
    <div className="lm-lc-flashcardtrainer">
      <div
        className="flashcardtrainer__button"
        onClick={startFlashcardTraining}
      >
        <button className="btn btn-primary">Start</button>
      </div>
    </div>
  )
}

export default FlashcardsTrainer
