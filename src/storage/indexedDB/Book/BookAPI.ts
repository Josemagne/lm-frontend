import { LM_Book } from "../../../types/Book/book";
import { Constructor } from "../../../types/common/constructor";
import BookDB from "./BookDB";

export default function BookAPI<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        public book = BookDB;

        public addBook = async (book: LM_Book) => {
            return await this.book.add(book);
        }

        public getBook = async (book_id: string) => {
            return await this.book.get(book_id);
        }

        public getBooks = async () => {
            return await this.book.toArray();
        }

        public updateBook = async (book: LM_Book) => {
            return await this.book.update(book.book_id, book)
        }

        public deleteBook = async (book_id: string) => {
            return await this.book.delete(book_id);
        }
    }
}