import lssv from 'localpersistence/lssv';
import { LM_Book } from '../types/Book/book';
import { LM_Metadata } from '../types/common/metadata';
import { LM_User } from '../types/common/user';
/**
* Gets the metadata
 */
export default class Metadata {


    /**
     * Gets the metadata from localstorage
     * @returns metadata object
     */
    public static async getMetadata(): Promise<LM_Metadata | undefined> {

        if (new lssv().getStorageObject("metadata")) return new lssv().getStorageObject("metadata");

        const user: LM_User = {
            name: ''
        }

        const metadata: LM_Metadata = {
            favoriteBooks: [], user: user, frontendBooks: {
                amount: 0, books: []
            }, serverBooks: {
                amount: 0, books: []
            }, notSynchronizedBooks: []
        }
        return await new lssv().createStorageObject("metadata", metadata)
    }

    public static async changeMetadata(metadata: LM_Metadata): Promise<LM_Metadata | undefined> {
        if (!new lssv().getStorageObject("metadata")) return;

        new lssv().createStorageObject("metadata", metadata);
    }

    /**
     * Adds book to the list of frontend books
     * @param book_id ID of the book
     * @returns book_id string of the book
     */
    public static async addFrontendBook(book_id: string): Promise<string> {
        await this.getMetadata().then((metadata) => {
            if (!metadata) {
                this.getMetadata().then((metadata) => {
                    if (!metadata) return;
                    metadata.frontendBooks.books.push(book_id);
                })
            }
        })

        // If we got to this point then we can return the book to show that is was successful
        return book_id;
    }

    public static async removeFrontendBook(book_id: string): Promise<string> {
        await this.getMetadata().then((metadata) => {
            if (!metadata) return;
            const books = metadata?.frontendBooks.books.filter((book) => {
                return book !== book_id
            })
            metadata.frontendBooks.books = books;
            this.changeMetadata(metadata);
        })

        return book_id;
    }


}