import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer"
import React from "react"
import useAppSelector from "../../../../../../../../../hooks/useAppSelector"
import { selectedBookSelector } from "../../../../../../../../../state/redux/features/bookSlice"
import { summariesSelector } from "../../../../../../../../../state/redux/selectors/summarySelectors"
import { LM_Book } from "../../../../../../../../../types/Book/book"
import { LM_Flashcard } from "../../../../../../../../../types/Flashcard/flashcard"
import { LM_Note } from "../../../../../../../../../types/Note/note"
import BookOverview from "../../BookOverview"

type Props = {}

const PdfOverview = (props: Props) => {
  const summaries = useAppSelector(summariesSelector)
  const flashcards = Object.values(
    useAppSelector((s) => s.flashcards.flashcards.flashcards)
  ) as LM_Flashcard[]
  const notes = Object.values(
    useAppSelector((s) => s.notes.notes.notes)
  ) as LM_Note[]
  const selectedBook: LM_Book = useAppSelector(selectedBookSelector)

  return (
    <div>
      <PDFDownloadLink
        document={
          <BookOverview
            summaries={summaries}
            notes={notes}
            flashcards={flashcards}
            book={selectedBook}
          />
        }
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  )
}

export default PdfOverview
