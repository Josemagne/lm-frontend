import React from "react"
import { LM_Flashcard } from "../../../../../../../types/Flashcard/flashcard"
import { LM_Summary } from "../../../../../../../types/summary/summary"
import { LM_Note } from "../../../../../../../types/Note/note"
import { LM_Book } from "../../../../../../../types/Book/book"
import "./bookoverview.scss"

type Props = {
  book: LM_Book
  flashcards: LM_Flashcard[]
  summaries: LM_Summary[]
  notes: LM_Note[]
}

const removeTags = (t: string) => {
  return t.slice(3).slice(0, t.length - 7)
}

const BookOverview = ({ summaries, notes, flashcards, book }: Props) => {
  return (
    <div className="bookmodal__bookoverview">
      <div className="bookoverview__title">
        <h1>
          {book.author_prename} {book.author_name} - {book.book_title}
        </h1>
      </div>
      <div className="bookoverview__flashcards">
        <h3>Flashcards</h3>
        {flashcards.map((f) => {
          return (
            <div className="bookoverview__flashcards__flashcard">
              <p
                dangerouslySetInnerHTML={{ __html: f.question }}
                className="bookoverview__flashcards__flashcard__question"
              ></p>
              <p
                dangerouslySetInnerHTML={{ __html: f.answer }}
                className="bookoverview__flashcards__flashcard__answer"
              ></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookOverview
