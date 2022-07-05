import { LM_Loanword } from "../../../types/Word/loanword"
import { LM_Vocabulary } from "../../../types/Word/vocabulary";
import { Slice, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VocabularyState {
    vocabulary: {
        [vocabulary_id: string]: LM_Vocabulary;
    },
    selection: {
        selectedVocabulary: LM_Vocabulary;
        isSelectingVocabulary: boolean;
    },
    new: {
        newVocabulary: LM_Vocabulary;
        isCreatingNewVocabulary: boolean;
    },
    filter: {
        isFilteringVocabulary: boolean;
        filteredVocabularyLoanwords: LM_Vocabulary
    }
}

const initialState: VocabularyState = {

}

export const vocabularySlice: Slice<VocabularyState> = createSlice({
    name: "vocabulary",
    initialState,
    reducers: {
        addVocabulary: (state: VocabularyState, payload: PayloadAction<LM_Vocabulary>) => { },
        updateVocabulary: () => { },
        deleteVocabulary: () => { },
        deleteVocabularyLoanWord: () => { },
        // TOGGLE
        toggleIsSelectingVocabulary: () => { },
        toggleIsCreatingNewVocabulary: () => { },
        toggleIsFilteringVocabulary: () => { },
        // UPDATE
        updateNewVocabulary: () => { },
        updateSelectedVocabulary: () => { },
        updateFilteredVocabulary: () => { },


    },
    extraReducers: (builder) => {

    }

})

export default vocabularySlice.reducer;
export const { addVocabulary } = vocabularySlice.actions;