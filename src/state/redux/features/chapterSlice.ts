import {
  createAsyncThunk,
  createSlice,
  Slice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit"
import API from "../../../api/API"
import FAPI from "../../../storage/indexedDB/FAPI"
import LM_Chapter from "../../../types/Book/chapter"
import { nanoid } from "nanoid"
import Chapter from "../../../classes/Chapter"
import { RootState } from "../store"

interface InitialChapterState {
  chapters: {
    loading: boolean
    error: string | null
    chapters: {
      [chapter_id: string]: LM_Chapter
    }
    amountOfChapters: 0
  }
  selection: {
    isSelectingChapter: boolean
    selectedChapter: LM_Chapter | null
  }
  filter: {
    isFilteringChapters: boolean
    filteredChapters: string[]
  }
  new: {
    isAddingNewChapter: boolean
    newChapter: LM_Chapter
  }
}

const initialState: InitialChapterState = {
  /**
   * All available chapters
   */
  chapters: {
    loading: false,
    error: null,
    chapters: {},
    amountOfChapters: 0,
  },
  selection: {
    selectedChapter: null,
    isSelectingChapter: false,
  },
  filter: {
    isFilteringChapters: false,
    filteredChapters: [],
  },
  new: {
    /**
     * The chapter that is being handled at the moment
     */
    newChapter: new Chapter(nanoid(), "", "", "TO_READ", 0, "", ""),
    isAddingNewChapter: false,
  },
}

export const fetchChaptersBackend = createAsyncThunk(
  "chaptersBackend/",
  async (book_id: string): Promise<LM_Chapter[] | any> => {
    console.log("fetchChaptersBackned called:")
    const chapters = await API.getChapters(book_id)

    return chapters
  }
)

export const fetchChaptersFrontend = createAsyncThunk(
  "chaptersFrontend/",
  async (book_id: string): Promise<LM_Chapter[] | any> => {
    const chapters = await FAPI.getChapters(book_id)

    return chapters
  }
)

export const chapterSlice: Slice<InitialChapterState> = createSlice({
  name: "chapters",
  initialState: initialState,
  reducers: {
    addChapter: (state, action: PayloadAction<LM_Chapter>) => {
      const chapter = action.payload

      state.chapters.chapters[chapter.chapter_id] = chapter
    },
    updateChapter: (state, action) => {
      const chapter = action.payload

      state.chapters.chapters[chapter.chapter_id] = chapter
    },
    deleteChapter: (state, action) => {
      const chapter_id = action.payload

      delete state.chapters.chapters[chapter_id]
    },
    /**
     * Update the selectedChapter
     * @param state
     * @param action
     */
    changeSelectedChapter: (state, action) => {
      const chapter: LM_Chapter = action.payload

      if (chapter === null) {
        state.selection.selectedChapter = chapter
      } else {
        state.selection.selectedChapter = chapter
        state.chapters.chapters[chapter.chapter_id] = chapter
      }
    },
    deleteSelectedChapter: (state, action) => {
      if (!state.selection.selectedChapter) return
      const chapter_id = state.selection.selectedChapter.chapter_id
      state.selection.selectedChapter = null
      delete state.chapters.chapters[chapter_id]
    },
    toggleAddingNewChapter: (state: InitialChapterState, action) => {
      state.new.isAddingNewChapter = !state.new.isAddingNewChapter
    },
    toggleIsSelectingChapter: (state: InitialChapterState, action) => {
      state.selection.isSelectingChapter = !state.selection.isSelectingChapter
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChaptersBackend.pending, (state, action) => {
      state.chapters.loading = true
    }),
      builder.addCase(fetchChaptersBackend.fulfilled, (state, action) => {
        const chapters = action.payload

        state.chapters.chapters = {}
        ;(chapters as LM_Chapter[]).forEach((chapter: LM_Chapter) => {
          state.chapters.chapters[chapter.chapter_id] = chapter
        })
        state.chapters.error = null
        state.chapters.loading = false
      }),
      builder.addCase(fetchChaptersBackend.rejected, (state, action) => {
        state.chapters.error = action.payload as string
        state.chapters.loading = false
      })
  },
})

const selectChapters = (state: RootState) => state.chapters.chapters.chapters

export const chaptersSelector = createSelector(selectChapters, (chapters) =>
  Object.values(chapters)
)

const selectSelectedChapter = (state: RootState) =>
  state.chapters.selection.selectedChapter

export const selectedChapterSelector = createSelector(
  selectSelectedChapter,
  (selectedChapter) => selectedChapter
)

const selectIsAddingNewChapter = (state: RootState) =>
  state.chapters.new.isAddingNewChapter

export const isAddingNewChapterSelector = createSelector(
  selectIsAddingNewChapter,
  (isAddingNewChapter) => isAddingNewChapter
)

const selectIsSelectingChapter = (state: RootState) =>
  state.chapters.selection.isSelectingChapter

export const isSelectingChapterSelector = createSelector(
  selectIsSelectingChapter,
  (isSelectingChapter) => isSelectingChapter
)

export const {
  changeSelectedChapter,
  addChapter,
  updateChapter,
  deleteChapter,
  toggleAddingNewChapter,
  deleteSelectedChapter,
  toggleIsSelectingChapter,
} = chapterSlice.actions

export default chapterSlice.reducer
