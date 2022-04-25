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
        chapter_ids: string[]
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
        chapter_ids: []
    },
    /**
     * The chapter that is being handled at the moment
     */
    selectedChapter: null,
    newChapter: new Chapter(nanoid(), "", "", "TO_READ", 0, "", ""),
    addingNewChapter: false
}

export const fetchChaptersBackend = createAsyncThunk("chaptersBackend/", async (): Promise<LM_Chapter[] | any> => {
    let error = null;

    let chapters = await API.getChapters();

    return chapters;
})

export const fetchChaptersFrontend = createAsyncThunk("chaptersFrontend/", async (): Promise<LM_Chapter[] | any> => {
    let error = null;

    let chapters = await FAPI.getChapters();

    if (chapters) return chapters;
    else return error;
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

        },
        deleteChapter: (state, action) => {

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
        // TODO deleteSelctedChapter

    },
    extraReducers: (builder) => {
        builder.addCase(fetchChaptersBackend.pending, (state, action) => {
            state.chapters.loading = true;
        }),
            builder.addCase(fetchChaptersBackend.fulfilled, (state, action) => {
                const chapters = action.payload;

                (chapters as LM_Chapter[]).forEach((chapter) => {
                    // NOTE Create an object if it is null
                    if (!state.chapters.chapters) {
                        state.chapters.chapters = {};
                    }

                    state.chapters.chapters[chapter.chapter_id] = chapter;

                    // Transfer the chapters to the book state
                    addChapter(chapter);

                })


            }),
            builder.addCase(fetchChaptersBackend.rejected, (state, action) => {
                state.chapters.error = action.payload as string;
                state.chapters.loading = false;
            }),
            builder.addCase(fetchChaptersFrontend.pending, (state, action) => {
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

export const { updateSelectedChapter, addChapter, updateChapter, deleteChapter } = chapterSlice.actions;

export default chapterSlice.reducer;