import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LM_Book } from "../../../types/Book/book";
import AuthorViewer from "./SubComponents/AuthorViewer/AuthorViewer";
import PagesViewer from "./SubComponents/PagesViewer/PagesViewer";
import ProgressViewer from "./SubComponents/ProgressViewer/ProgressViewer";
import TitleViewer from "./SubComponents/TitleViewer/TitleViewer";
import { useLiveQuery } from "dexie-react-hooks";
import mybooks from "../../../storage/indexedDB/books";
import BookContainer from "./SubComponents/BookContainer/BookContainer";
import ImageViewer from "./SubComponents/ImageViewer/ImageViewer";
import BookModal from "./SubComponents/BookModal/BookModal";
import { Panel } from "rsuite";
import ChapterModifier from "../../Chapters/ChapterModifier/ChapterModifier";
import Book from "../../../utils/Book";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getBooks as _getBooks } from "../../../state/redux/redux-thunk/actions";

type Props = {};

const BooksViewer = (props: Props) => {
  // TODO Implement redux-thunk
  const dispatch = useDispatch();
  dispatch(_getBooks());
  /* STATE */
  const [books, setBooks] = useState<LM_Book[]>([]);
  // The selected book that should be viewed
  const [selectedBook, setSelectedBook] = useState<string>();
  // ID of the chapter that was opened
  const [openChapter, setOpenChapter] = useState<string>();

  /* METHODS */

  const getBooks = async () => {
    let result = await Book.getBooks();
    if (!result) return;
    setBooks(result);
  };

  // only runs at the mounting
  useEffect(() => {
    if (books.length < 1) getBooks();
  }, []);

  return (
    <div className="lm-page lm-booksviewer">
      {books.length > 0
        ? books.map((book) => {
            return (
              <BookContainer
                book_id={book.book_id}
                key={book.book_id}
                children={
                  <Panel
                    header={
                      <Fragment>
                        <AuthorViewer author_fullname={book.author} />
                        <TitleViewer title={book.book_title} />
                        <ProgressViewer progress={book.progress} />
                        <PagesViewer pages={book.pages} />
                        <ImageViewer />
                      </Fragment>
                    }
                  >
                    {openChapter ? <ChapterModifier /> : null}
                  </Panel>
                }
              />
            );
          })
        : "no books here"}
      {selectedBook ? <BookModal /> : null}
    </div>
  );
};

export default BooksViewer;
