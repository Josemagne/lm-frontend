import React from "react"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Line,
} from "@react-pdf/renderer"
import { LM_Flashcard } from "../../../../../../../types/Flashcard/flashcard"
import { LM_Summary } from "../../../../../../../types/summary/summary"
import { LM_Note } from "../../../../../../../types/Note/note"
import { LM_Book } from "../../../../../../../types/Book/book"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    padding: 5,
  },
  flashcardsSection: {
    margin: 10,
    padding: 10,
    display: "flex",
  },
  flashcard: {
    padding: 5,
  },
  line: {
    backgroundColor: "black",
    width: "100%",
    height: "2pt",
  },
})

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
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {book.author_prename} {book.author_name} - {book.book_title}
        </Text>
        <View style={styles.section}>
          <Text>Flashcards</Text>
          <View style={styles.flashcardsSection}>
            {flashcards.map((f) => {
              return (
                <View style={styles.flashcard}>
                  <Text>{removeTags(f.question)}</Text>
                  <Text style={styles.line}></Text>
                  <Text>{removeTags(f.answer)}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default BookOverview
