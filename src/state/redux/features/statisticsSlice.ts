import { createSlice, Slice } from "@reduxjs/toolkit"
interface StatistiscsState {
  /**
   * The date and how much flashcards were revised. Key is a date and value is a number.
   */
  amountOfFlashcardsRevised: {
    [date: string]: number
  }
  /**
   * Contains the amount of books read for a period of time
   */
  amountOfBooksRead: {
    [date: string]: number
  }
}

const initialState: StatistiscsState = {}

export const statisticsSlice: Slice<StatistiscsState> = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
})
