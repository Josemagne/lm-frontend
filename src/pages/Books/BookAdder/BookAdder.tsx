import { useEffect } from "react"
import BookTitle from "./SubComponents/BookTitle/BookTitle"
import BookPages from "./SubComponents/BookPages/BookPages"
import Adder from "../../../components/helpers/Adder/Adder"
import { useFormik } from "formik"
import BookAuthor from "./SubComponents/BookAuthor/BookAuthor"
import useAppDispatch from "../../../hooks/useAppDispatch"
import { nanoid } from "nanoid"
import {
  addBook,
  changeSelectedBook,
  toggleAddingNewBook,
} from "../../../state/redux/features/bookSlice"
import { LM_Book } from "../../../types/Book/book"
import * as yup from "yup"
import Book from "../../../classes/Book"
import FAPI from "../../../storage/indexedDB/FAPI"
import API from "../../../api/API"
import { Modal } from "rsuite"
import useAppSelector from "../../../hooks/useAppSelector"
import Author from "../../../classes/Author"
import { RootState } from "../../../state/redux/store"
import BookCover from "./SubComponents/BookCover/BookCover"
import SearchResults from "./SubComponents/SearchResults/SearchResults"
import SearchBooks from "./SubComponents/SearchBooks/SearchBooks"
import AddOption from "./SubComponents/SearchBooks/SubComponents/AddOption/AddOption"

type Props = {}

/**
 * Modal where we can add a book
 */
const BookAdder = (props: Props) => {
  const dispatch = useAppDispatch()

  const newBook = useAppSelector(
    (state: RootState) => state.books.newBook
  ) as unknown as LM_Book
  const searchSelectedBook = useAppSelector(
    (store: RootState) => store.books.search.selectedBook
  )

  const isSearchingBook = useAppSelector(
    (store: RootState) => store.books.search.isSearchingBooks
  ) as unknown as boolean

  function getInitialValues(): LM_Book {
    return new Book(nanoid(), "", "", "", 0, 0, "")
  }

  const bookSchema = yup.object().shape({
    author_prename: yup
      .string()
      .required()
      .min(2, "Too short")
      .max(40, "Too long"),
    author_name: yup.string().min(2, "Too short").max(40, "Too long"),
    book_title: yup.string().required().min(2, "Too short").max(40, "Too long"),
  })

  // @ts-ignore
  const formik = useFormik({
    initialValues: getInitialValues(),
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: bookSchema,
    validate: async (values) => {
      const errors: any = {}

      if (!values.book_title) {
        errors.book_title = "Book title is required"
      }

      if (!values.author_prename) {
        errors.author = "A author prename must be given"
      }

      return errors
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(addBook(values))

      //await FAPI.addBook(values);
      console.log("new booookkkkkkkkk:", values)

      if (!sessionStorage.getItem("isTesting")) {
        await API.addBook(values)
      }

      const newAuthor = new Author(
        nanoid(),
        values.author_prename,
        values.author_name
      )
      //await FAPI.addAuthor(newAuthor);

      if (!sessionStorage.getItem("isTesting")) {
        await API.addAuthor(newAuthor)
      }

      // NOTE Resets the values of the form
      resetForm({
        values: getInitialValues(),
      })
    },
  })

  const addingNewBook = useAppSelector((state) => state.books.addingNewBook)

  function handleClose() {
    formik.resetForm()
    dispatch(toggleAddingNewBook(""))
  }

  /* METHODS */

  /* EVENTS */

  useEffect(() => {
    console.log(formik.errors)
  }, [formik.values])

  useEffect(() => {}, [addingNewBook, searchSelectedBook, isSearchingBook])

  return (
    <Modal open={addingNewBook} onClose={handleClose} data-testid="bookadder">
      <Modal.Header>Add A Book</Modal.Header>
      <div className="lm-lc-bookmodifier">
        <AddOption />
        {isSearchingBook && <SearchBooks />}
        {!isSearchingBook && (
          <form onSubmit={formik.handleSubmit}>
            {/* <BookImage bookImage="" /> */}

            <BookTitle values={formik.getFieldProps("book_title")} />
            <div className="lm-form-error">
              {formik.errors.book_title ? (
                <p>{formik.errors.book_title}</p>
              ) : null}
            </div>

            {/* <BookPages values={formik.getFieldProps("pages")} /> */}

            {/* <BookState
              values={formik.getFieldProps("read")}
              setFieldValue={formik.setFieldValue}
            /> */}

            {/* <BookProgress values={formik.getFieldProps("progress")} /> */}

            <BookAuthor
              author_prename={formik.getFieldProps("author_prename")}
              author_name={formik.getFieldProps("author_name")}
            />

            <div className="lm-adder-btn d-flex justify-content-center align-items-center m-4">
              {formik.isValid && formik.dirty ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => formik.handleSubmit()}
                >
                  +
                </button>
              ) : (
                <button type="button" className="btn btn-primary" disabled>
                  +
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}

export default BookAdder
