import { useEffect, useState } from "react";
import useAppDispatch from "../../../../hooks/useAppDispatch";
import { AutoComplete } from "rsuite";
import useAppSelector from "../../../../hooks/useAppSelector";
import { LM_Book } from "../../../../types/Book/book";
import { changeSelectedBook } from "../../../../state/redux/features/bookSlice";

type Props = {};

/**
 * Lets us select the book.
 * @param props
 * @returns
 */
const BookSelector = (props: Props) => {
  const [titles, setTitles] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const selectedBook = useAppSelector((state) => state.books.selectedBook.book);
  const books = useAppSelector((state) => state.books.books.books);
  if (!books)
    return (
      <div className="lm-lc-bookselector">
        <p>No books yet!</p>
      </div>
    );

  function getTitles(books: LM_Book[]) {
    const _books = Object.values(books);
    const _titles: string[] = [];

    if (books.length < 1) return;
    for (let i = 0; i < _books.length; i++) {
      const title = _books[i].book_title;

      _titles.push(title);
    }

    setTitles(_titles);
  }

  if (!titles.length < 1) {
    getTitles(Object.values(books));
  }

  const setSelectedBook = (bookID: string) => {
    const book = books[bookID];
    dispatch(changeSelectedBook({ book_id: book.book_id, book: book }));
  };

  const changeHandler = (v: string) => {
    const bookArray: LM_Book[] = Object.values(books);
    const selectedBook = bookArray.find((b) => {
      if (b.book_title === v) return b;
    });

    if (!selectedBook) return;
    console.log("selected: ", selectedBook);

    setSelectedBook(JSON.parse(JSON.stringify(selectedBook.book_id)));
  };

  useEffect(() => {}, [selectedBook]);

  return (
    <div className="lm-lc-bookselector">
      {selectedBook ? <h3>{selectedBook.title}</h3> : <h3>No Book selected</h3>}
      {titles ? (
        //   @ts-ignore
        <AutoComplete data={titles} onChange={(v) => changeHandler(v)} />
      ) : null}
    </div>
  );
};

export default BookSelector;
