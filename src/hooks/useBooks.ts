import { useEffect, useState } from "react";
import { LM_Book } from "../types/Book/book";
import Book from "../storage/indexedDB/Book";

interface Props {
    /**
     * frontend means indexedDB and backend simply the backend
     */
    type: "backend" | "frontend"
}

interface Return {
    data: LM_Book[] | undefined;
    error: string | null;
    isPending: boolean;
}

/**
 * Gets the books either from backend or indexedDB
 */
const useBooks = ({ type }: Props): Return => {

    const [data, setData] = useState<LM_Book[] | undefined>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fn = async () => {

            /* GET BOOKS FROM THE BACKEND */
            // TODO Write!
            if (type === "backend") {

            }

            /* GET BOOKS FROM FRONTEND */
            else if (type === "frontend") {
                await Book.getBooks().then((books) => {
                    console.log("here")
                    console.log("in func ", books)
                    // If we got books from indexedDB
                    if (books) {
                        setData((prev) => {
                            if (!prev) return;
                            return [...prev, ...books]
                        });
                        setIsPending(false)
                        return;
                    }
                }).catch((err) => {
                    console.log("Could not get the books from indexedDB")
                    setError(err);
                    setIsPending(false);
                })
            }

        }
        fn();
    }, [])

    return { data, error, isPending };
}

export default useBooks;