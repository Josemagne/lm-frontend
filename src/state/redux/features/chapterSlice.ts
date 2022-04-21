import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import Server from '../../../services/Server';
import Book from '../../../storage/indexedDB/Book';
import LM_Chapter from '../../../types/Book/chapter';
import { addChapter } from './bookSlice';

interface InitialChapterState {
    chapters: {
        loading: boolean;
        error: string | null;
        chapters: {
            [chapter_id: string]: LM_Chapter;
        } | null;
    }
}

const initialState: InitialChapterState = {
    chapters: {
        loading: false,
        error: null,
        chapters: null

    }
}

export const fetchChapters = createAsyncThunk("chapters/", async (): Promise<LM_Chapter[] | any> => {
    let error = null;

    let chapters = await Server.getChapters();

    return chapters;
})

export const chapterSlice: Slice<InitialChapterState> = createSlice({
    name: "chapters",
    initialState: initialState,
    reducers: {
        addChapter: (state, action) => {

        },
        getChapter: (state, action) => {

        },
        getChapters: (state, action) => {

        },
        updateChapter: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChapters.pending, (state, action) => {
            state.chapters.loading = true;
        }),
            builder.addCase(fetchChapters.fulfilled, (state, action) => {
                const chapters = action.payload;

                if (chapters.length > 1) {
                    (chapters as LM_Chapter[]).forEach((chapter) => {
                        // NOTE Create an object if it is null
                        if (!state.chapters.chapters) {
                            state.chapters.chapters = {};
                        }

                        state.chapters.chapters[chapter.chapter_id] = chapter;

                        // Transfer the chapters to the book state
                        addChapter(chapter);

                        // Persist the chapters in frontend
                        Book.addChapter(chapter.book_id, chapter);
                    })
                }
                else state.chapters.chapters = null;


            }),
            builder.addCase(fetchChapters.rejected, (state, action) => {
                state.chapters.error = action.payload as string;
                state.chapters.loading = false;
            })
    }
})

export const { } = chapterSlice.actions;

export default chapterSlice.reducer;