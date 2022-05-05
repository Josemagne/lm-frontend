import { createAsyncThunk, createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../../api/API';
import FAPI from '../../../storage/indexedDB/FAPI';
import LM_Chapter from '../../../types/Book/chapter';
import { nanoid } from 'nanoid';
import Chapter from '../../../classes/Chapter';

interface InitialChapterState {
    chapters: {
        loading: boolean;
        error: string | null;
        chapters: {
            [chapter_id: string]: LM_Chapter;
        } 
        amountOfChapters: 0
    },
    selectedChapter: LM_Chapter | null,
    newChapter: LM_Chapter,
    addingNewChapter: boolean
}

const initialState: InitialChapterState = {
    /**
     * All available chapters
     */
    chapters: {
        loading: false,
        error: null,
        chapters: {},
        amountOfChapters: 0

    },
    /**
     * The chapter that is being handled at the moment
     */
    selectedChapter: null,
    newChapter: new Chapter(nanoid(), "", "", "TO_READ", 0, "", ""),
    addingNewChapter: false
}

export const fetchChaptersBackend = createAsyncThunk("chaptersBackend/", async (book_id: string): Promise<LM_Chapter[] | any> => {
  console.log("fetchChaptersBackned called:");
    const chapters = await API.getChapters(book_id);

    return chapters;
})

export const fetchChaptersFrontend = createAsyncThunk("chaptersFrontend/", async (book_id: string): Promise<LM_Chapter[] | any> => {
    const chapters = await FAPI.getChapters(book_id);

    return chapters;
})

export const chapterSlice: Slice<InitialChapterState> = createSlice({
    name: "chapters",
    initialState: initialState,
    reducers: {
        addChapter: (state, action: PayloadAction<LM_Chapter>) => {
            const chapter = action.payload;

            // If the chapters obj is empty
            if (!state.chapters.chapters) state.chapters.chapters = {};

            state.chapters.chapters[chapter.chapter_id] = chapter;
        },
        updateChapter: (state, action) => {
            const chapter = action.payload;

            state.chapters.chapters[chapter.chapter_id] = chapter;
            state.selectedChapter = chapter;

        },
        deleteChapter: (state, action) => {
            const chapter_id = action.payload;

            delete state.chapters.chapters[chapter_id];
        },
        /**
         * Update the selectedChapter
         * @param state 
         * @param action 
         */
        updateSelectedChapter: (state, action) => {
            const chapter: LM_Chapter = action.payload;

            state.selectedChapter = chapter;
            state.chapters.chapters[chapter.chapter_id] = chapter;
        },
        deleteSelectedChapter: (state, action) => {
            if (!state.selectedChapter) return;
            const chapter_id = state.selectedChapter.chapter_id; 
            state.selectedChapter = null;
            delete state.chapters.chapters[chapter_id];
        },
        toggleAddingNewChapter: (state, action) => {
            state.addingNewChapter = !state.addingNewChapter;
        }



    },
    extraReducers: (builder) => {
        builder.addCase(fetchChaptersBackend.pending, (state, action) => {
            state.chapters.loading = true;
        }),
            builder.addCase(fetchChaptersBackend.fulfilled, (state, action) => {
                const chapters = action.payload;

              // @ts-ignore
              console.log("Fetched chapters: ", chapters)

                        state.chapters.chapters = {};
                (chapters as LM_Chapter[]).forEach((chapter: LM_Chapter) => {

                    state.chapters.chapters[chapter.chapter_id] = chapter;

                })
              state.chapters.error = null;
              state.chapters.loading = false;
            }),
            builder.addCase(fetchChaptersBackend.rejected, (state, action) => {
                state.chapters.error = action.payload as string;
                state.chapters.loading = false;
            }),
            builder.addCase(fetchChaptersFrontend.pending, (state) => {
                state.chapters.loading = true;
            }),
            builder.addCase(fetchChaptersFrontend.fulfilled, (state, action) => {
                const chapters: LM_Chapter[] = action.payload;
                state.chapters.loading = false;
                if (!chapters) state.chapters.error = chapters;
                if (!state.chapters.chapters) state.chapters.chapters = {}

                chapters.forEach((chapter) => {
                    // @ts-ignore
                    state.chapters.chapters[chapter.chapter_id] = chapter;
                })
            }),
            builder.addCase(fetchChaptersFrontend.rejected, (state, action) => {
                state.chapters.error = action.payload as string;
                state.chapters.loading = false;
            })
    }
})

export const { updateSelectedChapter, addChapter, updateChapter, deleteChapter, toggleAddingNewChapter, deleteSelectedChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
