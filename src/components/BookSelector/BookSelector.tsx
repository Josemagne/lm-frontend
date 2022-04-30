import { useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { AutoComplete } from "rsuite";
import useAppSelector from "../../hooks/useAppSelector";
import { LM_Book } from "../../types/Book/book";
import { changeSelectedBook } from "../../state/redux/features/bookSlice";


/**
 * Lets us select the book for the flashcards.
 * @param props
 * @returns
 */
const BookSelector = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const selectedBook = useAppSelector((state) => state.books.selectedBook);

  const books = useAppSelector((state) => state.books.books.books);

  if (!books)
    return (
      <div className="lm-lc-bookselector">
        <p>No books yet!</p>
      </div>
    );

  /**
   * Gets each title from the book and sets it int titles: string[]
   * @param books
   * @returns
   */
  function getTitles(books: LM_Book[]) {
    const _books = Object.values(books);
    const _titles: string[] = [];

    if (books.length < 1) return;
    
    for (let i = 0; i < _books.length; i++) {
      let title = "";

      if (books[i].author_name) {
      title = books[i].author_prename + books[i].author_name +  " - " + books[i].book_title;
      }
      else {
      title = books[i].author_prename + " - "+ books[i].book_title;
      }

      _titles.push(title);
    }

    setTitles(_titles);
  }

  if (titles.length < 1) {
    getTitles(Object.values(books));
  }

  const setSelectedBook = (bookID: string) => {
    const book = books[bookID];
    dispatch(changeSelectedBook(book));
  };

  /*
   * Gets title from the main title
   */
  function getTitle(mainTitle: string) {
    return mainTitle.split("-")[1].trim();
  }

  const selectionHandler = (v: string) => {
    const bookArray: LM_Book[] = Object.values(books);
    const _selectedBook = bookArray.find((b) => {
      if (b.book_title === getTitle(v)) return b;
    });

    if (!_selectedBook) return;

    setSelectedBook(_selectedBook.book_id);
  };

  useEffect(() => {
    console.log("selectedbook:" , selectedBook) 
  }, [selectedBook]);

  return (
    <div className="lm-lc-bookselector">
      {selectedBook ? <h3>{selectedBook.title}</h3> : <h3>Select a book</h3>}
      {titles ? (
        //   @ts-ignore
        <AutoComplete
          renderMenuItem={
            (item) => {
              return <div className="fs-2">
                {item} 
              </div>
          }
          }
          onSelect={(v) => selectionHandler(v)}
        // @ts-ignore
        data={titles} />

      ) : null}
    </div>
  );
};

export default BookSelector;
