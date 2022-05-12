import React from "react"
import { LM_Flashcard } from "../../../../types/Flashcard/flashcard"

type Props = {
  flashcards: LM_Flashcard[]
}

export default function FlashcardSchema({ flashcards }: Props) {
  return (
    <div className="lm-gc-flashcardSchema">
      {/* EntityName Title E.g. Book, Chapter, Subject*/}
      {/* Question */} {/* Answer */}
      {flashcards.map((flashcard) => {
        return (
          <>
            <div className="lm-gc-flashcardSchema__question">
              {flashcard.question}
            </div>

            <div className="lm-gc-flashcardSchema__answer">
              {flashcard.answer}
            </div>
          </>
        )
      })}
    </div>
  )
}
