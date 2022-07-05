import { Slice, createSlice } from '@reduxjs/toolkit';
import { LM_Citation } from '../../../types/Book/citation';

interface CitationState {
    citation: {
        citation: {
            [citation_id: string]: LM_Citation;
        }
    },
    new: {
        newCitation: LM_Citation;
        isAddingNewCitation: boolean;
    },
    selection: {
        isSelectingCitation: boolean;
        selectedCitation: null | LM_Citation;
    },
    filter: {
        isFilteringCitations: boolean;
        filteredCitations: LM_Citation[];
    }
}

const initialState: CitationState = {}

export const citationSlice: Slice<CitationState> = createSlice({
    name: "citation",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default citationSlice.reducer;
export const { } = citationSlice.actions;
