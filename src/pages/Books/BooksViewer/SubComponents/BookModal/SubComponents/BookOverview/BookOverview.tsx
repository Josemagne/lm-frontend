import React from "react"
import { LM_Flashcard } from "../../../../../../../types/Flashcard/flashcard"
import { LM_Summary } from "../../../../../../../types/summary/summary"
import { LM_Note } from "../../../../../../../types/Note/note"
import { LM_Book } from "../../../../../../../types/Book/book"
import "./bookoverview.scss"
import LM_Chapter from "../../../../../../../types/Book/chapter"
import { Accordion } from "react-bootstrap"

type Props = {
  book: LM_Book
  flashcards: LM_Flashcard[]
  summaries: LM_Summary[]
  notes: LM_Note[]
  chapters: LM_Chapter[]
}

const removeTags = (t: string) => {
  return t.slice(3).slice(0, t.length - 7)
}

const BookOverview = ({
  summaries,
  notes,
  flashcards,
  book,
  chapters,
}: Props) => {
  return (
    <div className="bookmodal__bookoverview">
      <div className="bookoverview__title">
        <h1>
          {book.author_prename} {book.author_name} - {book.book_title}
        </h1>
      </div>
      <div className="bookoverview__contents">
        <h3>Contents</h3>
        <div>
          <a href="#bookoverview__chapters">Chapters</a>
        </div>
        <div>
          <a href="#bookoverview__flashcards">Flashcards</a>
        </div>
      </div>
      <div className="bookoverview__chapters" id="bookoverview__chapters">
        <h3>Chapters</h3>
        {/* TODO Make the summaries for the chapter available */}
        {chapters.map((c) => {
          return (
            <div className="chapters__chapter">
              <h5>{c.title}</h5>
              <p>read: {c.status}</p>
              {/* <p>created summary:</p> */}
            </div>
          )
        })}
      </div>
      <div className="bookoverview__flashcards" id="bookoverview__flashcards">
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
