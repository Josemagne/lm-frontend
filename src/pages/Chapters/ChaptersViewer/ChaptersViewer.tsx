import { useSelector } from "react-redux";
import { store, RootState } from "../../../state/redux/store";
import { useLiveQuery } from "dexie-react-hooks";
import books from "../../../storage/indexedDB/books";
import { useState } from "react";
import { LM_Book } from "../../../types/Book/book";
import ChapterModifier from "../ChapterModifier/ChapterModifier";
import ChapterContainer from "./SubComponents/ChapterContainer/ChapterContainer";
import ChapterAdder from "./SubComponents/ChapterAdder/ChapterAdder";
type Props = {};

const ChaptersViewer = ({}: Props) => {
  const [book, setBook] = useState<LM_Book>();
  const bookID = useSelector((state: RootState) => state.book.selectedBook);
  //   Get the book from indexedDB
  if (bookID) {
    const _book = useLiveQuery(() => books.books.get(bookID));
    setBook(_book);
  }
  return (
    <div className="lm-chaptersviewer">
      {book && book.chapters ? (
        book.chapters.map((chapter) => {
          <ChapterContainer chapter={chapter} />;
        })
      ) : (
        <p>No chapters yet.</p>
      )}
      <ChapterAdder bookID={book?.book_id} />
    </div>
  );
};

export default ChaptersViewer;
