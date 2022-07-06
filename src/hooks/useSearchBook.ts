import { useEffect, useState } from "react";
import axios from 'axios';

const useSearchBook = (title: string, find: boolean) => {
    const [data, setData] = useState<any[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const searchBook = async (isbn: string) => {

        const res = await axios
            .get(
                `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
            )

        const book = res.data[`ISBN:${isbn}`]
        console.log("res: ", res)
        console.log("book: ", book)
        // @ts-ignore
        setData((prev) => {
            return [...prev, book];
        })

    }

    const convertToQueryString = (str: string): string => {
        return str.split(" ").join("+")
    }

    useEffect(() => {
        const search = async () => {

            try {
                const response = await axios.get(`http://openlibrary.org/search.json?q=${convertToQueryString(
                    title
                )}&jscmd=data`)
                const docs = response.data.docs as any[];
                console.log("docs: ", docs)
                docs.forEach((d) => {
                    searchBook(d.isbn[0])
                })

            }
            catch (err) {
                setError(err as string)
            } finally {
                setLoading(false)
            }
        }
        if (find) search();
    }, [find])


    return { data, error, loading };
}

export default useSearchBook;