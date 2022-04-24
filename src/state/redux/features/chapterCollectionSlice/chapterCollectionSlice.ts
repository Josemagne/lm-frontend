import { LM_ChapterCollection } from "../../../../types/ChapterCollection/chaptercollection"
import { createAsyncThunk, Slice, createSlice } from '@reduxjs/toolkit';

interface InitialChapterCollectionState {
    chapterCollections: {
        chapterCollections: {
            [chapterCollection_id: string]: LM_ChapterCollection;
        }
        loading: boolean;
        error: null | string;
    }
}

const initialChapterCollectionState: InitialChapterCollectionState = {
    chapterCollections: {
        chapterCollections: {

        },
        loading: false,
        error: null
    }
}

export const fetchChapterCollectionsBackend = createAsyncThunk("chaptersCollectionBackend/", async (): Promise<LM_ChapterCollection[] | any> => {

})

export const fetchChaptersCollectionFrontend = createAsyncThunk("chaptersCollectionFrontend", async (): Promise<LM_ChapterCollection[] | any> => {
})


export const chapterCollectionSlice: Slice<InitialChapterCollectionState> = createSlice({
    name: "chapterCollection",
    initialState: initialChapterCollectionState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchChapterCollectionsBackend.pending, (state, action) => {
            state.chapterCollections.loading = true;
        }),
            builder.addCase(fetchChapterCollectionsBackend.fulfilled, (state, action) => {

            }),
            builder.addCase(fetchChapterCollectionsBackend.rejected, (state, action) => {

            }),
            builder.addCase(fetchChaptersCollectionFrontend.pending, (state, action) => {

            }),
            builder.addCase(fetchChaptersCollectionFrontend.fulfilled, (state, action) => {

            }),
            builder.addCase(fetchChaptersCollectionFrontend.rejected, (state, action) => {

            })
    }
})