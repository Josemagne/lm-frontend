import Dexie from "dexie"
/**
 * Database for the books
 */
const booksDB = new Dexie("books");



export default booksDB;